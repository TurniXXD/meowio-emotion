/** @jsxImportSource @emotion/react */

import { css } from '@emotion/react';
import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import { Colors } from '../../styles/variables';

export interface ITextField {
  fieldProps: ControllerRenderProps<FieldValues, any>;
  placeholder?: string;
  password?: boolean;
  email?: boolean;
  className?: string;
  textArea?: boolean;
  dataTestId?: string;
}

const textField = css`
  border: 1px solid ${Colors.lightGray};
  border-radius: 5px;
  font-size: 16px;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  outline: none;
`;

export default function TextField(props: ITextField) {
  if (props?.textArea) {
    return (
      <textarea
        css={textField}
        className={`${props?.className || ''}`}
        {...props.fieldProps}
        {...(props.dataTestId && { 'data-testid': props.dataTestId })}
        {...(props.placeholder && { placeholder: props.placeholder })}
      />
    );
  }

  return (
    <input
      css={textField}
      className={`${props?.className || ''}`}
      {...props.fieldProps}
      {...(props.dataTestId && { 'data-testid': props.dataTestId })}
      {...(props.placeholder && { placeholder: props.placeholder })}
      type={
        (props.password && 'password') || (props.email && 'email') || 'text'
      }
    />
  );
}
