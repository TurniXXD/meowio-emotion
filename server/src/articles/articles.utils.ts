import { ArticleDto, ArticleDtoPreview } from './dto/articles.dto';
import { Article } from './entities/article.entity';

export const mapArticlesFromDBtoArticleDtoPreview = (
  articles: Article[],
): ArticleDtoPreview[] => {
  const articlesMapped = articles.map((article) => {
    return {
      articleId: article.id,
      title: article.title,
      perex: article.perex,
      imageId: article.image_id,
      createdAt: article.created_at,
      lastUpdatedAt: article.updated_at,
    };
  });

  return articlesMapped;
};

export const mapArticleFromDBtoArticleDto = (article: Article): ArticleDto => {
  return {
    articleId: article.id,
    title: article.title,
    perex: article.perex,
    imageId: article.image_id,
    content: article.content,
    createdAt: article.created_at,
    lastUpdatedAt: article.updated_at,
  };
};
