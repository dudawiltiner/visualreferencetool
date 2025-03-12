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
  Select: ({ children }: any) => <div>{children}</div>,
  SelectTrigger: ({ children }: any) => <div>{children}</div>,
  SelectValue: ({ children, placeholder }: any) => (
    <div>{children || placeholder}</div>
  ),
  SelectContent: ({ children }: any) => <div>{children}</div>,
  SelectItem: ({ children }: any) => <div>{children}</div>,
}));

describe('FilterBar', () => {
  it('renders search form and filters', () => {
    render(<FilterBar type="images" />);

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Select group')).toBeInTheDocument();
    expect(screen.getByText('Select tag')).toBeInTheDocument();
  });
});
