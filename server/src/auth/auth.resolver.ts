import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AccessTokenDto, LoginDto } from './dto/login-auth.dto';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { GqlApiKeyGuard } from './auth.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(GqlApiKeyGuard)
  @Mutation(() => AccessTokenDto, {
    description: 'Sign in into the application',
  })
  async login(@Args('input') loginDto: LoginDto): Promise<AccessTokenDto> {
    return await this.authService.login(loginDto);
  }
}
