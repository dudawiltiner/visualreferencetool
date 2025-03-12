import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { PaletteExportImport } from '../PaletteExportImport';

// Mock the DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    palettes: [],
    setPalettes: jest.fn(),
  }),
}));

describe('PaletteExportImport', () => {
  it('renders export and import buttons', () => {
    render(<PaletteExportImport />);

    expect(screen.getByText('Export')).toBeInTheDocument();
    expect(screen.getByText('Import')).toBeInTheDocument();
  });

  it('renders dialog trigger button', () => {
    render(<PaletteExportImport />);

    expect(screen.getByRole('button', { name: /import/i })).toBeInTheDocument();
  });
});
