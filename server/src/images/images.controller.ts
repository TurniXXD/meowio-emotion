import {
  Controller,
  Post,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { OwnerTokenAuthGuard } from '@auth/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiResponse } from '@nestjs/swagger';
import { swagger } from '@utils/constants';
import { UploadImageDto } from './dto/upload-image.dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { genShortUUID } from '@utils/index';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(OwnerTokenAuthGuard)
  @Post()
  @ApiResponse({
    status: 201,
    description: 'Detail of the created article',
    type: UploadImageDto,
  })
  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @ApiResponse(swagger.apiResponses.requiredBodyParams)
  // Specify the content type for the file upload
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  // Save the file locally
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (_, __, callback) => {
          const uploadPath = `./${process.env.IMAGE_UPLOAD_PATH}` || './images';
          callback(null, uploadPath);
        },
        filename: (_, file, callback) => {
          const uniqueFileName = genShortUUID() + extname(file.originalname);
          callback(null, uniqueFileName);
        },
      }),
    }),
  )
  create(
    // Validate that the file is png
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png)' })],
      }),
    )
    file: Express.Multer.File,
  ): UploadImageDto {
    return {
      imageId: file.filename.split('.png')[0],
      name: file.originalname,
    };
  }

  @UseGuards(OwnerTokenAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
