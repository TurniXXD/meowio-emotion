import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { decode } from 'jsonwebtoken';
import { AuthService, JwtPayload } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { customHeaders } from '@utils/constants';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const api_key = req.headers[customHeaders.xApiKey];

    if (await this.authService.validateApiKey(api_key)) {
      return true;
    }

    throw new UnauthorizedException('Invalid API key');
  }
}

@Injectable()
export class GqlApiKeyGuard extends AuthGuard('custom') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const api_key = req.headers[customHeaders.xApiKey];

    if (api_key === '') {
      return false;
    }

    return await this.authService.validateApiKey(api_key);
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class GqlJwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor() {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const gqlContext = GqlExecutionContext.create(context);
    return gqlContext.getContext().req;
  }
}

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  private jwtAuthGuard = new JwtAuthGuard();
  private apiKeyGuard = new ApiKeyGuard(this.authService);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      await this.apiKeyGuard.canActivate(context);
      await this.jwtAuthGuard.canActivate(context);

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}

@Injectable()
export class OwnerTokenAuthGuard extends TokenAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (!(await super.canActivate(context))) {
      // If the parent TokenAuthGuard denies access, return false.
      return false;
    }

    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.replace('Bearer ', '');
    const decodedToken = decode(token) as JwtPayload;
    if (decodedToken?.owner) {
      return true;
    }

    throw new UnauthorizedException();
  }
}
