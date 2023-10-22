import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { CommentsModule } from './comments/comments.module';
import { ArticlesModule } from './articles/articles.module';
import { TenantsModule } from './tenants/tenants.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    // Keep this first so that other imports have access to config
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    DatabaseModule,
    ArticlesModule,
    CommentsModule,
    TenantsModule,
    UsersModule,
    ImagesModule,
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: 'schema/schema.graphql',
        playground: configService.get('NODE_ENV') === 'dev',
        debug: configService.get('NODE_ENV') === 'dev',
        context: ({ req }) => ({ req }),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(
        __dirname,
        '..',
        process.env.IMAGE_UPLOAD_PATH || 'images',
      ),
      serveRoot: '/images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
