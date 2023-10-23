import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from '@emotion/styled';
import { useAuth } from '../../auth';
import {
  alignCenter,
  container,
  justifyCenter,
  Row,
} from '../../styles/shared';
import { Colors } from '../../styles/variables';
import useArticlesCountStore from '../../stores/useArticlesCountStore';

const NavWrapper = styled.nav`
  ${container}
  ${alignCenter}
  justify-content: space-between;
  background-color: ${Colors.bgGray};
  padding-top: 0;

  div {
    ${alignCenter}
    padding: 0.2rem 0;
    gap: 3rem;
  }

  div a {
    ${justifyCenter}
  }

  .active {
    color: ${Colors.text};
  }

  .inactive {
    color: ${Colors.textSecondary};
  }
`;

const ArticlesCount = styled.span`
  width: 20px;
  height: 20px;
  background-color: ${Colors.bgDark};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  margin-left: 10px;
`;

const Nav = () => {
  const { t } = useTranslation('common');
  const { authCookie: isLoggedIn, isOwner } = useAuth();
  const { articlesCount } = useArticlesCountStore();

  return (
    <NavWrapper>
      <Row>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >
          <img src="logo.png" alt="Meowio" height={50} width={50} />
        </NavLink>
        {!!isLoggedIn && (
          <NavLink
            to="/articles"
            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
          >
            {t('recentArticles')}
          </NavLink>
        )}
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >
          {t('about')}
        </NavLink>
      </Row>
      {!!isLoggedIn ? (
        isOwner() && (
          <div>
            <NavLink
              to="/my-articles"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              {t('myArticles')}
              {articlesCount !== 0 && (
                <ArticlesCount>{articlesCount}</ArticlesCount>
              )}
            </NavLink>
            <NavLink
              to="/create-article"
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
            >
              {t('createArticle')}
            </NavLink>
          </div>
        )
      ) : (
        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? 'active' : 'inactive')}
        >
          {t('login')}
        </NavLink>
      )}
    </NavWrapper>
  );
};

export default Nav;
