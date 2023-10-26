import {
  FieldValues,
  RegisterOptions,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import Badge, { BadgeType } from '../Badge';
import Cancel from '../Icons/cancel';
import styled from '@emotion/styled';
import { Colors } from '../../styles/variables';

export enum ButtonType {
  Primary = 'primary',
  Upload = 'upload',
}

export enum UploadTarget {
  Image = 'image/*',
  ImagePng = 'image/png',
}

const ButtonWrapper = styled.div`
  margin-bottom: 1rem !important;
  position: relative;
  display: block;

  input[type='file'] {
    position: absolute;
    top: 0;
    left: 0;
    width: 153px;
    height: 38px;
    display: block;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
  }

  .textOnlyButton {
    background-color: transparent;
    border: none;
  }

  .primary {
    background-color: ${Colors.blue};
  }

  .upload {
    background-color: ${Colors.gray};
  }
`;

const ButtonStyled = styled.button`
  color: ${Colors.white};
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  display: inline-block;
  z-index: 1;
  border-radius: 5px;
  outline: none;
`;

const BadgeWrapper = styled.div`
  display: block;
`;

export interface UploadButtonProps {
  uploadTarget?: UploadTarget;
  registerOptions?: RegisterOptions;
  name: string;
  fieldProps: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  selectedFileBadge: File | null;
  setSelectedFileBadge: Dispatch<SetStateAction<File | null>>;
}

const Button = ({
  type,
  onClick,
  children,
  textOnly,
  submit,
  uploadButtonProps,
  dataTestId,
}: {
  type: ButtonType;
  onClick?: () => void;
  children: ReactNode;
  textOnly?: boolean;
  submit?: boolean;
  uploadButtonProps?: UploadButtonProps;
  dataTestId?: string;
}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    file
      ? uploadButtonProps?.setSelectedFileBadge(file)
      : uploadButtonProps?.setSelectedFileBadge(null);
  };
  const isPrimaryButton = type === ButtonType.Primary;
  const fieldName = uploadButtonProps ? uploadButtonProps.name : 'file';

  const handleFileClear = () => {
    uploadButtonProps?.setSelectedFileBadge(null);
    uploadButtonProps?.setValue && uploadButtonProps.setValue(fieldName, null);
  };

  return (
    <div>
      <ButtonWrapper>
        {!isPrimaryButton && uploadButtonProps?.fieldProps && (
          <input
            {...uploadButtonProps.fieldProps(
              fieldName,
              uploadButtonProps?.registerOptions
            )}
            {...(uploadButtonProps?.uploadTarget && {
              accept: uploadButtonProps.uploadTarget,
            })}
            type="file"
            onChange={handleFileChange}
            data-testid={dataTestId || 'button-upload'}
          />
        )}
        <ButtonStyled
          className={`${textOnly ? 'textOnlyButton' : ''} ${
            isPrimaryButton ? 'primary' : 'upload'
          }`}
          {...(onClick && { onClick })}
          {...(submit && { type: 'submit' })}
          {...(dataTestId && { 'data-testid': dataTestId })}
          {...(isPrimaryButton && {
            'data-testid': dataTestId || 'button-primary',
          })}
        >
          {children}
        </ButtonStyled>
      </ButtonWrapper>
      {uploadButtonProps?.selectedFileBadge && (
        <BadgeWrapper>
          <Badge
            dataTestId="selected-file-button"
            type={BadgeType.Secondary}
            onClick={handleFileClear}
            icon={<Cancel />}
            text={uploadButtonProps.selectedFileBadge.name}
          />
        </BadgeWrapper>
      )}
    </div>
  );
};

export default Button;
