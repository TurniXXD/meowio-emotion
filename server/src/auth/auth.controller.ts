import { Controller, Post, Body, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AccessTokenDto, LoginDto } from './dto/login-auth.dto';
import { ApiKeyGuard, TokenAuthGuard } from './auth.guard';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { MiddlewareService } from '@middleware/middleware.service';
import { swagger } from '@utils/constants';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly middlewareService: MiddlewareService,
  ) {}

  @HttpCode(201)
  @ApiOperation({ summary: 'Sign in into the application' })
  @ApiBearerAuth()
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 201,
    description: 'Access token detail',
    type: AccessTokenDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid login credentials',
    content: {
      'application/json': {
        example: {
          code: 'INVALID_CREDENTIALS',
          message: 'Password is invalid',
        },
      },
    },
  })
  @ApiResponse(swagger.apiResponses.requiredBodyParams)
  @UseGuards(ApiKeyGuard)
  @Post('login')
  login(@Body() loginDto: LoginDto): any {
    this.middlewareService.resolveRequiredParams(loginDto);
    return this.authService.login(loginDto);
  }

  @UseGuards(TokenAuthGuard)
  @Post('logout')
  logout() {
    return this.authService.logout();
  }
}
