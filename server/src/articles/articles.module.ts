import { Module } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ArticlesController } from './articles.controller';
import { Article } from './entities/article.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@auth/auth.module';
import { Tenant } from '@tenants/entities/tenant.entity';
import { MiddlewareModule } from '@middleware/middleware.module';
import { MiddlewareService } from '@middleware/middleware.service';
import { ArticlesResolver } from './articles.resolver';
import { AuthService } from '@auth/auth.service';
import { User } from '@users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    AuthModule,
    MiddlewareModule,
    TypeOrmModule.forFeature([Article]),
    TypeOrmModule.forFeature([Tenant]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ArticlesController],
  providers: [
    ArticlesService,
    MiddlewareService,
    ArticlesResolver,
    AuthService,
    JwtService,
  ],
})
export class ArticlesModule {}
