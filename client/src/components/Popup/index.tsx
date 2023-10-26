import React, { ReactNode, useEffect, useState } from 'react';
import styled from '@emotion/styled';
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
  right: 10%;
  top: 13%;
  z-index: 1000;

  div {
    border-radius: 10px;
    padding: 1rem;
  }

  .error {
    background-color: ${Colors.bgError};
  }

  .success {
    background-color: ${Colors.bgSuccess};
  }
`;

export default function Popup({ children, className, text, type }: PopupProps) {
  const [visible, setVisible] = useState(true);
  // const isErrorPopup = type === PopupType.Error ? error : success;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 3000); // Disappear after 3 seconds

    // Clear the timeout and hide the popup if it's unmounted before the timeout is reached
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
      {visible && (
        <PopupWrapper
          css={type === PopupType.Error ? 'error' : 'success'}
          className={className || ''}
          data-testid={`popup-${type}`}
        >
          <div className={type === PopupType.Error ? 'error' : 'success'}>
            {text || children}
          </div>
        </PopupWrapper>
      )}
    </>
  );
}
