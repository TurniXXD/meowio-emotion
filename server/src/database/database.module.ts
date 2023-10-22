import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getOrThrow('DATABASE_URL'),
        synchronize: configService.get('DATABASE_SYNC'), // Auto create database tables based on entity definitions, boolean, use migrations in production instead
        autoLoadEntities: true, // Auto load entities from the entities folder
        logging: configService.get('DATABASE_LOGGING'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
