import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { Colors, Screens } from './variables';

// Global

export const globalStyles = (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
      }

      @font-face {
        font-family: 'Helvetica Neue', sans-serif;
        font-style: normal;
        font-weight: 400;
        src: url(https://fonts.cdnfonts.com/css/helvetica-neue-55);
      }

      body {
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: ${Colors.text};
        margin: 0;
        padding: 0;
      }

      a {
        text-decoration: none;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
      }

      a:visited {
        color: inherit;
      }

      h1 {
        font-size: 40px;
        line-height: 48px;
      }

      h1,
      h2,
      h3,
      h4 {
        font-weight: 500;
      }
    `}
  />
);

// Shared classes

export const row = css`
  display: flex;
  flex-direction: row;
`;

export const col = css`
  display: flex;
  flex-direction: column;
`;

export const justifyCenter = css`
  display: flex;
  justify-content: center;
`;

export const alignCenter = css`
  display: flex;
  align-items: center;
`;

export const container = css`
  padding: 2.5rem 8% 0 8%;
  @media (min-width: ${Screens.sm}) {
    padding: 3rem 14% 0 14%;
  }
`;

export const link = css`
  color: ${Colors.blue};
  :visited {
    color: ${Colors.blue};
  }
`;

export const subTitle = css`
  font-size: 14px;
`;

// Components

export const Row = styled.div`
  ${row}
`;

export const Col = styled.div`
  ${col}
`;

export const Container = styled.div`
  ${container}
`;

export const SubTitle = styled.span`
  ${subTitle}
`;
