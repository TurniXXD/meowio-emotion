import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@users/users.module';
import { User } from '@users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TenantsModule } from '@tenants/tenants.module';
import { Tenant } from '@tenants/entities/tenant.entity';
import { MiddlewareModule } from '@middleware/middleware.module';
import { MiddlewareService } from '@middleware/middleware.service';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    MiddlewareModule,
    ConfigModule,
    PassportModule,
    UsersModule,
    TenantsModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Tenant]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, MiddlewareService, AuthResolver],
})
export class AuthModule {}
