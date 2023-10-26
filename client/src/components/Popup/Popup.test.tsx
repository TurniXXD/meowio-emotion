import { act, render, screen } from '@testing-library/react';
import Popup, { PopupType } from '.';

jest.useFakeTimers();

describe('Popup', () => {
  it('should render error popup if type is set to error popup', () => {
    render(<Popup type={PopupType.Error} />);

    const errorPopup = screen.getByTestId('popup-error');

    expect(errorPopup).toBeInTheDocument();
  });

  it('should render success popup if type is set to success popup', () => {
    render(<Popup type={PopupType.Success} />);

    const successPopup = screen.getByTestId('popup-success');

    expect(successPopup).toBeInTheDocument();
  });

  it('should dissapear after 3 seconds', () => {
    render(<Popup type={PopupType.Success} />);

    const successPopup = screen.getByTestId('popup-success');

    expect(successPopup).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    const successPopupClosed = screen.queryByTestId('popup-success');

    expect(successPopupClosed).toBeNull();
  });
});
