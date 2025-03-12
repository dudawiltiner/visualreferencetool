import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ImageSearch } from '../ImageSearch';

jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

jest.mock('@hooks/Images/useSearchImages', () => ({
  useSearchImages: () => ({
    mutate: jest.fn(),
    isPending: false,
  }),
}));

jest.mock('@ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="search-button" {...props}>
      {children}
    </button>
  ),
}));

jest.mock('@ui/input', () => ({
  Input: (props: any) => <input data-testid="search-input" {...props} />,
}));

jest.mock('@ui/skeleton', () => ({
  Skeleton: () => <div data-testid="skeleton" />,
}));

jest.mock('@ui/tabs', () => ({
  Tabs: ({ children }: any) => <div data-testid="tabs">{children}</div>,
  TabsContent: ({ children }: any) => (
    <div data-testid="tabs-content">{children}</div>
  ),
  TabsList: ({ children }: any) => (
    <div data-testid="tabs-list">{children}</div>
  ),
  TabsTrigger: ({ children }: any) => (
    <div data-testid="tabs-trigger">{children}</div>
  ),
}));

describe('ImageSearch', () => {
  it('renderiza o formulário de busca', () => {
    render(<ImageSearch onSelectImage={jest.fn()} />);

    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('search-button')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('Search for brand images...')
    ).toBeInTheDocument();
  });

  it('renderiza o estado inicial sem resultados', () => {
    render(<ImageSearch onSelectImage={jest.fn()} />);

    expect(
      screen.getByText('Search for images related to a brand or company')
    ).toBeInTheDocument();
    expect(
      screen.getByText('Example: "Spotify", "Nike", "Apple"')
    ).toBeInTheDocument();
  });
});
