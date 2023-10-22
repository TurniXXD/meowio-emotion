import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

@Injectable()
export class MiddlewareService {
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
  resolveRequiredParams(params: any) {
    if (Object.keys(params).length === 0) {
      throw new BadRequestException('Required body params missing');
    }
  }
}
