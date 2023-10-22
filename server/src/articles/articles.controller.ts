import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { TokenAuthGuard, OwnerTokenAuthGuard } from '@auth/auth.guard';
import { MiddlewareService } from '@middleware/middleware.service';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { swagger } from '@utils/constants';
import { ArticleDto, ArticleDtoPreview } from './dto/articles.dto';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
    private readonly middlewareService: MiddlewareService,
  ) {}

  @ApiOperation({ summary: 'Create an article' })
  @ApiResponse({
    status: 201,
    description: 'Detail of the created article',
    type: ArticleDto,
  })
  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @ApiResponse(swagger.apiResponses.requiredBodyParams)
  @UseGuards(OwnerTokenAuthGuard)
  @Post()
  async create(
    @Body() createArticleDto: CreateArticleDto,
  ): Promise<ArticleDto> {
    this.middlewareService.resolveRequiredParams(createArticleDto);
    return await this.articlesService.create(createArticleDto);
  }

  @ApiOperation({ summary: 'Get all articles' })
  @ApiResponse({
    status: 200,
    description: 'Article list',
    type: [ArticleDtoPreview],
  })
  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @UseGuards(TokenAuthGuard)
  @Get()
  findAll(): Promise<Array<ArticleDtoPreview>> {
    return this.articlesService.findAll();
  }

  @ApiOperation({ summary: 'Get an article by ID' })
  @ApiResponse({
    status: 200,
    description: 'Article list',
    type: ArticleDto,
  })
  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @UseGuards(TokenAuthGuard)
  @Get(':id')
  findOne(@Param('id') id?: string): Promise<ArticleDto> {
    return this.articlesService.findOne(id);
  }

  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @ApiResponse(swagger.apiResponses.requiredBodyParams)
  @UseGuards(TokenAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    this.middlewareService.resolveRequiredParams(id);
    return this.articlesService.update({ id, ...updateArticleDto });
  }

  @ApiResponse(swagger.apiResponses.unathorized)
  @ApiResponse(swagger.apiResponses.forbidden)
  @ApiResponse(swagger.apiResponses.requiredBodyParams)
  @UseGuards(TokenAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    this.middlewareService.resolveRequiredParams(id);
    return this.articlesService.remove(+id);
  }
}
