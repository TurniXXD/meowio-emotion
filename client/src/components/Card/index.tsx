import { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Colors } from '../../styles/variables';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const CardWrapper = styled.div`
  border-radius: 10px;
  box-shadow: 0px 16px 48px 0px ${Colors.bg};
  padding: 2.5rem 2rem 1.5rem 2rem;
  background-color: ${Colors.white};
`;

export default function Card({ children, className }: CardProps) {
  return <CardWrapper className={`${className || ''}`}>{children}</CardWrapper>;
}
