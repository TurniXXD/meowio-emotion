import React from 'react';
import { render } from '@testing-library/react';
import Card from '.';

describe('Card Component', () => {
  test('it renders children correctly', () => {
    const { getByText } = render(
      <Card>
        <p>Test Child</p>
      </Card>
    );

    const childElement = getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  test('it applies the given className', () => {
    const { container } = render(
      <Card className="custom-class">
        <p>Test Child</p>
      </Card>
    );

    const cardWrapper = container.querySelector('.custom-class');
    expect(cardWrapper).toBeInTheDocument();
  });
});
