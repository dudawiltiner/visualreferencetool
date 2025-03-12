import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Sidebar } from '../Sidebar';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    pathname: '/images',
  }),
  usePathname: () => '/images',
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: any) => (
    <a href={href} data-testid="nav-link">
      {children}
    </a>
  );
});

// Mock DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    isDarkMode: false,
    setIsDarkMode: jest.fn(),
  }),
}));

// Mock Button component
jest.mock('@ui/button', () => ({
  Button: ({ children, onClick, ...props }: any) => (
    <button onClick={onClick} {...props}>
      {children}
    </button>
  ),
}));

describe('Sidebar', () => {
  it('renders navigation items', () => {
    render(<Sidebar />);

    const navLinks = screen.getAllByTestId('nav-link');
    expect(navLinks).toHaveLength(5);

    const linkTexts = navLinks.map((link) => link.textContent);
    expect(linkTexts).toContain('Dashboard');
    expect(linkTexts).toContain('Images');
    expect(linkTexts).toContain('Color Palettes');
    expect(linkTexts).toContain('Groups');
    expect(linkTexts).toContain('Tags');
  });

  it('renders theme toggle button', () => {
    render(<Sidebar />);

    expect(screen.getByText('Dark Mode')).toBeInTheDocument();
  });

  it('renders title', () => {
    render(<Sidebar />);

    expect(screen.getByText('Visual Reference Tool')).toBeInTheDocument();
  });
});
