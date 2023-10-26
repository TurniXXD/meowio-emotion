import React, { useState } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button, { ButtonType, UploadTarget, UploadButtonProps } from '.';
import { useForm } from 'react-hook-form';

const FormWithUploadButton = () => {
  const { register, setValue } = useForm();
  const [selectedFileBadge, setSelectedFileBadge] = useState<File | null>(null);

  const uploadButtonProps: UploadButtonProps = {
    uploadTarget: UploadTarget.Image,
    name: 'file',
    fieldProps: register,
    setValue,
    selectedFileBadge,
    setSelectedFileBadge,
  };

  return (
    <Button type={ButtonType.Upload} uploadButtonProps={uploadButtonProps}>
      Upload file
    </Button>
  );
};

describe('Button Component', () => {
  const file = new File(['sample content'], 'sample.txt', {
    type: 'text/plain',
  });

  it('renders primary button correctly', () => {
    render(
      <Button type={ButtonType.Primary} onClick={jest.fn()}>
        Click me!
      </Button>
    );

    const primaryButton = screen.getByTestId('button-primary');

    expect(primaryButton).toBeInTheDocument();
  });

  it('renders upload button correctly', () => {
    render(<FormWithUploadButton />);

    const uploadButton = screen.getByTestId('button-upload');

    expect(uploadButton).toBeInTheDocument();
  });

  it('triggers onClick handler when the button is clicked', () => {
    const onClickMock = jest.fn();
    render(
      <Button type={ButtonType.Primary} onClick={onClickMock}>
        Click me!
      </Button>
    );

    const button = screen.getByTestId('button-primary');
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
  });

  it('handles file input change', () => {
    render(<FormWithUploadButton />);

    const fileInput = screen.getByTestId('button-upload');

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    const selectedFileButton = screen.getByTestId('selected-file-button');

    expect(selectedFileButton).toBeInTheDocument();
  });

  it('clears selected file', () => {
    render(<FormWithUploadButton />);

    const fileInput = screen.getByTestId('button-upload');

    fireEvent.change(fileInput, {
      target: { files: [file] },
    });

    const selectedFileButton = screen.getByTestId('selected-file-button');

    fireEvent.click(selectedFileButton);

    const selectedFileButtonClosed = screen.queryByTestId(
      'selected-file-button'
    );

    expect(selectedFileButtonClosed).toBeNull();
  });
});
