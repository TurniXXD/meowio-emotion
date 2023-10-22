import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
  @ApiProperty({
    example: 'Lorem Ipsum',
  })
  title: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  perex: string;

  @ApiProperty({
    example:
      "# Lorem Ipsum\n**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  })
  content: string;

  @ApiProperty({
    description:
      'The unique identifier of the article image, actual image hosted on third party',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  imageId: string;
}
