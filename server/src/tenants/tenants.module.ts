import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { MiddlewareService } from '@middleware/middleware.service';
import { MiddlewareModule } from '@middleware/middleware.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant]), MiddlewareModule],
  controllers: [TenantsController],
  providers: [TenantsService, MiddlewareService],
})
export class TenantsModule {}
