import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '@users/entities/user.entity';
import { verifyPassword } from './auth.utils';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login-auth.dto';
import { Tenant } from '@tenants/entities/tenant.entity';
import { isValidUUID } from '@utils/index';
export interface JwtPayload {
  sub: string;
  owner?: boolean;
}

@Injectable()
export class AuthService {
  private readonly tokenExpirationTime = 3600;
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersRepository.findOneBy({
      username,
    });
    if (!user) {
      return null;
    }

    const passwordValid = await verifyPassword(password, user.password);
    if (!passwordValid) {
      return null;
    }

    return user;
  }

  async resolveHasOwnerPrivileges(
    username: string,
    password: string,
  ): Promise<boolean> {
    const owner = await this.tenantRepository.findOneBy({ name: username });
    if (!owner) {
      return false;
    }

    const passwordValid = await verifyPassword(password, owner.password);
    if (!passwordValid) {
      throw new Error(`Error wrong admin password`);
    }

    return true;
  }

  async generateToken(user: User, password: string): Promise<string> {
    const hasOwnerPrivileges = await this.resolveHasOwnerPrivileges(
      user.username,
      password,
    );

    const payload: JwtPayload = {
      ...(hasOwnerPrivileges && { owner: true }),
      sub: user.id,
    };

    const signedToken = this.jwtService.sign(payload);
    return signedToken;
  }

  async login({ username, password }: LoginDto) {
    const user = await this.validateUser(username, password);
    if (user === null) {
      throw new UnauthorizedException();
    }

    return {
      access_token: await this.generateToken(user, password),
      expires_in: this.tokenExpirationTime,
      token_type: 'bearer',
    };
  }

  async validateApiKey(api_key: string): Promise<boolean> {
    if (!isValidUUID(api_key)) {
      return false;
    }

    const apiKeyValid = await this.tenantRepository.findOneBy({
      api_key,
    });

    if (!api_key || !apiKeyValid || api_key !== apiKeyValid.api_key) {
      return false;
    }
    return true;
  }

  logout() {
    return 'This action adds a new auth';
  }
}
