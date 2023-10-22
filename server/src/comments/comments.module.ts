import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { AuthModule } from '@auth/auth.module';
import { Tenant } from '@tenants/entities/tenant.entity';
import { CommentsResolver } from './comments.resolver';
import { User } from '@users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '@auth/auth.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentsResolver, AuthService, JwtService],
})
export class CommentsModule {}
