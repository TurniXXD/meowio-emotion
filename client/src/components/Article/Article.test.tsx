import React from 'react';
import Article from './index';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-i18next', () => ({
  useTranslation: (namespace: string) => ({
    t: (key: string) => key,
  }),
}));

describe('Article Component', () => {
  const mockArticle = {
    articleId: '550e8400-e29b-41d4-a716-446655440000',
    perex: 'Sample perex',
    title: 'Sample Title',
    imageId: 'f47ac10b',
    createdAt: new Date(),
    lastUpdatedAt: new Date(),
  };

  it('renders correctly with all props', () => {
    render(
      <BrowserRouter>
        <Article props={mockArticle} />
      </BrowserRouter>
    );

    expect(screen.getByText('Sample Title')).toBeInTheDocument();
    expect(screen.getByText('Sample perex')).toBeInTheDocument();
  });

  it('renders nothing when any prop is missing', () => {
    render(
      <BrowserRouter>
        <Article props={{}} />
      </BrowserRouter>
    );

    expect(screen.queryByText('Sample Title')).toBeNull();
  });
});
