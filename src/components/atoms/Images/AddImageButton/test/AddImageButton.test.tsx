import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DataProvider } from '../../../../../providers/DataProvider/DataProvider';
import { AddImageButton } from '../AddImageButton';

// Mock do DataProvider
const mockDataContext = {
  groups: [],
  addGroup: jest.fn(),
  updateGroup: jest.fn(),
  deleteGroup: jest.fn(),
  images: [],
  addImage: jest.fn(),
  updateImage: jest.fn(),
  deleteImage: jest.fn(),
  tags: [],
  addTag: jest.fn(),
  updateTag: jest.fn(),
  deleteTag: jest.fn(),
  palettes: [],
  addPalette: jest.fn(),
  updatePalette: jest.fn(),
  deletePalette: jest.fn(),
};

jest.mock('../../../../../providers/DataProvider/DataProvider', () => ({
  ...jest.requireActual('../../../../../providers/DataProvider/DataProvider'),
  useData: () => mockDataContext,
}));

describe('AddImageButton', () => {
  it('renders correctly', () => {
    render(
      <DataProvider>
        <AddImageButton />
      </DataProvider>
    );
    expect(screen.getByText('Add Image')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('opens dialog when clicked', async () => {
    const user = userEvent.setup();
    render(
      <DataProvider>
        <AddImageButton />
      </DataProvider>
    );

    await user.click(screen.getByText('Add Image'));

    // Verifica se o diálogo foi aberto
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
