import { Field, ObjectType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@ObjectType()
export class ArticleDtoPreview {
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @Field({
    description: 'The ID of the article.',
  })
  articleId: string;

  @ApiProperty({
    example: 'Lorem Ipsum',
  })
  @Field({
    description: 'The title of the article.',
  })
  title: string;

  @ApiProperty({
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
  })
  @Field({
    description: 'The perex (short summary) of the article.',
  })
  perex: string;

  @ApiProperty({
    description:
      'The unique identifier of the article image, actual image hosted on third party',
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  })
  @Field({
    description: 'The ID of the image associated with the article.',
  })
  imageId: string;

  @ApiProperty({
    example: '2023-07-25T12:53:27.328Z',
  })
  @Field({
    description: 'Timestamp representation of article datetime creation.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2023-07-25T12:53:27.328Z',
  })
  lastUpdatedAt: Date;
}

@ObjectType({
  description: 'Represents an article.',
})
export class ArticleDto extends ArticleDtoPreview {
  @ApiProperty({
    example:
      "# Lorem Ipsum\n**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
  })
  @Field({
    description: 'The content of the article.',
  })
  content: string;
}
