import React, { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Colors } from '../../styles/variables';

export enum PopupType {
  Success = 'success',
  Error = 'error',
}

interface PopupProps {
  children?: ReactNode;
  className?: string;
  text?: string;
  type: PopupType;
}

const PopupWrapper = styled.div`
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
  padding: 1rem;
  z-index: 1000;
`;

export const error = css`
  background-color: ${Colors.bgError};
`;

export const success = css`
  background-color: ${Colors.bgSuccess};
`;

export default function Popup({ children, className, text, type }: PopupProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000); // Disappear after 3 seconds

    // Clear the timeout and hide the popup if it's unmounted before the timeout is reached
    return () => {
      clearTimeout(timeout);
      setVisible(false);
    };
  }, []);

  return (
    <>
      {visible && (
        <PopupWrapper
          css={type === PopupType.Error ? error : success}
          className={className || ''}
        >
          {text || children}
        </PopupWrapper>
      )}
    </>
  );
}
