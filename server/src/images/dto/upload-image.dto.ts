import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    example: 'IMO0sUB',
  })
  imageId: string;

  @ApiProperty({
    example: 'profile.png',
  })
  name: string;
}
