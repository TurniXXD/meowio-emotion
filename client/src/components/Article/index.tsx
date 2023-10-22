import { Link } from 'react-router-dom';
import { ArticleDtoPreview } from '../../api';
import { formatDate, resolveImageUrl } from '../../utils';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import { SubTitle, link, subTitle } from '../../styles/shared';

const ArticleWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const ImageCol = styled.div`
  width: 20rem;
  height: 20rem;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
`;

const Article = ({ props }: { props: ArticleDtoPreview }) => {
  const { articleId, perex, title, imageId, createdAt, lastUpdatedAt } = props;
  const { t } = useTranslation('articles');

  if (articleId && perex && title && imageId && createdAt && lastUpdatedAt) {
    return (
      <ArticleWrapper>
        <ImageCol>
          <img src={resolveImageUrl(imageId)} alt={imageId} />
        </ImageCol>
        <div>
          <SubTitle>{title}</SubTitle>
          <SubTitle>{' • '}Elisabeth Strain • {formatDate(createdAt)}</SubTitle>
          <p>{perex}</p>
          <Link to={`/articles/${articleId}`} className={`${link} ${subTitle}`}>
            {t('readWholeArticle')}
          </Link>
        </div>
      </ArticleWrapper>
    );
  }
  return null;
};

export default Article;
