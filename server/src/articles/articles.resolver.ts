import { Resolver, Mutation, InputType, Field, Args } from '@nestjs/graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article as ArticleEntity } from './entities/article.entity';
import { ArticleDto } from './dto/articles.dto';
import { ArticlesService } from './articles.service';
import { UseGuards } from '@nestjs/common';
import { GqlJwtAuthGuard, GqlApiKeyGuard } from '@auth/auth.guard';

@InputType({
  description: 'Input type for updating an article.',
})
export class ArticleUpdateInput {
  @Field({
    description: 'The ID of the article.',
  })
  id: string;

  @Field({
    description: 'The title of the article.',
    nullable: true,
  })
  title?: string;

  @Field({
    description: 'The perex (short summary) of the article.',
    nullable: true,
  })
  perex?: string;

  @Field({
    description: 'The content of the article.',
    nullable: true,
  })
  content?: string;

  @Field({
    description: 'The ID of the image associated with the article.',
    nullable: true,
  })
  imageId?: string;
}

@Resolver()
export class ArticlesResolver {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articlesRepository: Repository<ArticleEntity>,
    private readonly articlesService: ArticlesService,
  ) {}

  @UseGuards(GqlApiKeyGuard)
  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => ArticleDto, {
    description: 'Update an article.',
  })
  async updateArticle(
    @Args('input', { type: () => ArticleUpdateInput })
    input: ArticleUpdateInput,
  ): Promise<ArticleDto> {
    return await this.articlesService.update(input);
  }

  @UseGuards(GqlApiKeyGuard)
  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Boolean, {
    description: 'Remove an article.',
  })
  removeArticle(@Args('id') id: string): boolean {
    const removedArticle = this.articlesRepository.delete(id);
    return !!removedArticle;
  }
}
