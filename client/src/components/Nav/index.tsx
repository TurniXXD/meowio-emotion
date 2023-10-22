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

const Nav = () => {
  const { t } = useTranslation('common');
  const { authCookie: isLoggedIn, isOwner } = useAuth();

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
