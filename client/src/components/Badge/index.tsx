/** @jsxImportSource @emotion/react */

import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/variables';
import { css } from '@emotion/react';

export enum BadgeType {
  Primary = 'primary',
  Secondary = 'secondary',
  Success = 'success',
  Danger = 'danger',
  Warning = 'warning',
  Info = 'info',
  Light = 'light',
  Dark = 'dark',
}

interface BadgeProps {
  type: BadgeType;
  icon?: JSX.Element;
  onClick?: () => void;
  children?: ReactNode;
  text?: string;
  className?: string;
  dataTestId?: string
}

const BadgeWrapper = styled.div`
  padding: 0.2rem 0.5rem;
  color: ${Colors.white};
  margin-bottom: 0 !important;
  border: 1px solid transparent;
  border-radius: 5px;

  span {
    font-size: 12px;
  }
`;

export default function Badge({
  children,
  text,
  className,
  icon,
  onClick,
  type,
  dataTestId
}: BadgeProps) {
  const resolveBadgeTypeStyles = (type: BadgeType) => {
    switch (type) {
      case BadgeType.Primary:
        return css`
          border-color: ${Colors.blue};
        `;
      case BadgeType.Secondary:
        return css`
          border-color: ${Colors.gray};
          color: ${Colors.gray};
        `;
      case BadgeType.Danger:
        return css`
          background-color: ${Colors.danger};
        `;
      case BadgeType.Warning:
        return css`
          background-color: ${Colors.warning};
          color: ${Colors.text};
        `;
      case BadgeType.Info:
        return css`
          background-color: ${Colors.info};
        `;
      case BadgeType.Light:
        return css`
          background-color: ${Colors.bg};
          color: ${Colors.text};
        `;
      case BadgeType.Dark:
        return css`
          background-color: ${Colors.bgDark};
        `;
    }
  };

  const resolverBadgeStyles = (type: BadgeType, withIcon?: boolean) => {
    return css`
      ${resolveBadgeTypeStyles(type)}
      ${withIcon &&
      css`
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
      `}
    `;
  };

  return (
    <BadgeWrapper
      css={resolverBadgeStyles(type, !!icon)}
      onClick={onClick}
      data-testid={dataTestId || 'badge'}
      className={className || ''}
    >
      {text ? <span>{text}</span> : children}
      {icon}
    </BadgeWrapper>
  );
}
