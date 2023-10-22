import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { MiddlewareService } from '@middleware/middleware.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tenants')
export class TenantsController {
  constructor(
    private readonly tenantsService: TenantsService,
    private readonly middlewareService: MiddlewareService,
  ) {}

  @ApiResponse({
    status: 400,
    description: 'Required body params missing',
    content: {
      'application/json': {
        example: {
          code: 'REQUIRED_PARAMS_MISSING',
          message: 'Required body params missing',
        },
      },
    },
  })
  @Post()
  async create(@Body() createTenantDto: CreateTenantDto) {
    this.middlewareService.resolveRequiredParams(createTenantDto);
    return this.tenantsService.create(createTenantDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantsService.findOne(+id);
  }
}
