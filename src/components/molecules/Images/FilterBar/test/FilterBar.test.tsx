import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { FilterBar } from '../FilterBar';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn(),
    toString: jest.fn(),
  }),
}));

jest.mock('@lib/use-local-storage', () => ({
  useLocalStorage: () => [[], jest.fn()],
}));

jest.mock('@ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button {...props}>{children}</button>
  ),
}));

jest.mock('@ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock('@ui/select', () => ({
  Select: ({ children }: any) => <div data-testid="select">{children}</div>,
  SelectTrigger: ({ children }: any) => (
    <div data-testid="select-trigger">{children}</div>
  ),
  SelectValue: ({ children, placeholder }: any) => (
    <div data-testid="select-value">{children || placeholder}</div>
  ),
  SelectContent: ({ children }: any) => (
    <div data-testid="select-content" style={{ display: 'none' }}>
      {children}
    </div>
  ),
  SelectItem: ({ children, value }: any) => (
    <div data-testid="select-item" data-value={value}>
      {children}
    </div>
  ),
}));

describe('FilterBar', () => {
  const mockProps = {
    type: 'images' as const,
    initialGroups: [],
    initialTags: [],
  };

  it('renders search form and filters', () => {
    render(<FilterBar {...mockProps} />);

    expect(screen.getByPlaceholderText('Search images...')).toBeInTheDocument();
    const selectValues = screen.getAllByTestId('select-value');
    expect(selectValues[0]).toHaveTextContent('All Groups');
    expect(selectValues[1]).toHaveTextContent('All Tags');

    const selectItems = screen.getAllByTestId('select-item');
    expect(selectItems[0]).toHaveTextContent('All Groups');
    expect(selectItems[0]).toHaveAttribute('data-value', 'all');
    expect(selectItems[1]).toHaveTextContent('All Tags');
    expect(selectItems[1]).toHaveAttribute('data-value', 'all');
  });
});
