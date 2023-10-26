import { ArticleDto } from '../../api';
import { formatDate, resolveImageUrl } from '../../utils';
import { MarkdownResolver } from '../MarkdownResolver';
import styled from '@emotion/styled';
import { justifyCenter } from '../../styles/shared';

const ArticleWrapper = styled.div`
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const InfoWrapper = styled.div`
  margin: 1rem 0;
`;

const ImageWrapper = styled.div`
  ${justifyCenter}
  img {
    width: 100%;
    height: auto;
    max-width: 50rem;
  }
`;

const ContentWrapper = styled.div`
  * {
    font-size: 20px;
    line-height: 24px;
  }
`;

const Article = ({
  props: {
    articleId,
    perex,
    content,
    title,
    imageId,
    createdAt,
    lastUpdatedAt,
  },
}: {
  props: ArticleDto;
}) => {
  if (
    articleId &&
    perex &&
    title &&
    content &&
    imageId &&
    createdAt &&
    lastUpdatedAt
  ) {
    return (
      <ArticleWrapper>
        <h1>{title}</h1>
        <InfoWrapper>
          Elisabeth Strain • <span>{formatDate(createdAt)}</span>
        </InfoWrapper>
        <ImageWrapper>
          <img src={resolveImageUrl(imageId)} alt={imageId} />
        </ImageWrapper>
        <ContentWrapper>
          <MarkdownResolver text={content} />
        </ContentWrapper>
      </ArticleWrapper>
    );
  }
  return null;
};

export default Article;
