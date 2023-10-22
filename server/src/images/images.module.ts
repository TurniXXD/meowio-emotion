import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from '@tenants/entities/tenant.entity';
import { AuthService } from '@auth/auth.service';
import { AuthModule } from '@auth/auth.module';
import { User } from '@users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService, AuthService, JwtService],
})
export class ImagesModule {}
