import type { ColorPalette, Image } from '@lib/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RecentItems } from '../RecentItems';

// Mock ImageCard
jest.mock('@molecules/Images/ImageCard/ImageCard', () => ({
  ImageCard: ({ image }: { image: Image }) => (
    <div data-testid={`image-card-${image.id}`}>{image.title}</div>
  ),
}));

// Mock PaletteCard
jest.mock('@molecules/Palettes/PaletteCard/PaletteCard', () => ({
  PaletteCard: ({ palette }: { palette: ColorPalette }) => (
    <div data-testid={`palette-card-${palette.id}`}>{palette.name}</div>
  ),
}));

// Mock DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    images: mockImages,
    palettes: mockPalettes,
  }),
}));

const mockImages: Image[] = [
  {
    id: '1',
    title: 'Recent Image 1',
    url: 'url1',
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: '2',
    title: 'Recent Image 2',
    url: 'url2',
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-11T00:00:00Z',
    updatedAt: '2024-03-11T00:00:00Z',
  },
  {
    id: '3',
    title: 'Recent Image 3',
    url: 'url3',
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Recent Image 4',
    url: 'url4',
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-09T00:00:00Z',
    updatedAt: '2024-03-09T00:00:00Z',
  },
  {
    id: '5',
    title: 'Older Image',
    url: 'url5',
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-08T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z',
  },
];

const mockPalettes: ColorPalette[] = [
  {
    id: '1',
    name: 'Recent Palette 1',
    colors: [],
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-12T00:00:00Z',
    updatedAt: '2024-03-12T00:00:00Z',
  },
  {
    id: '2',
    name: 'Recent Palette 2',
    colors: [],
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-11T00:00:00Z',
    updatedAt: '2024-03-11T00:00:00Z',
  },
  {
    id: '3',
    name: 'Recent Palette 3',
    colors: [],
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-03-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'Recent Palette 4',
    colors: [],
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-09T00:00:00Z',
    updatedAt: '2024-03-09T00:00:00Z',
  },
  {
    id: '5',
    name: 'Older Palette',
    colors: [],
    tagIds: [],
    groupId: null,
    createdAt: '2024-03-08T00:00:00Z',
    updatedAt: '2024-03-08T00:00:00Z',
  },
];

describe('RecentItems', () => {
  it('renders title and tab options', () => {
    render(<RecentItems />);

    expect(screen.getByText('Recent Items')).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /images/i })).toBeInTheDocument();
    expect(screen.getByRole('tab', { name: /palettes/i })).toBeInTheDocument();
  });

  it('shows recent images by default', () => {
    render(<RecentItems />);

    // Verifica se apenas os 4 itens mais recentes são mostrados
    expect(screen.getByTestId('image-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('image-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('image-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('image-card-4')).toBeInTheDocument();
    expect(screen.queryByTestId('image-card-5')).not.toBeInTheDocument();
  });

  it('switches to palettes tab and shows recent palettes', async () => {
    const user = userEvent.setup();
    render(<RecentItems />);

    const palettesTab = screen.getByRole('tab', { name: /palettes/i });
    await user.click(palettesTab);

    // Verifica se apenas os 4 itens mais recentes são mostrados
    expect(screen.getByTestId('palette-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('palette-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('palette-card-3')).toBeInTheDocument();
    expect(screen.getByTestId('palette-card-4')).toBeInTheDocument();
    expect(screen.queryByTestId('palette-card-5')).not.toBeInTheDocument();
  });

  it('shows empty message when no images exist', () => {
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValue({
        images: [],
        palettes: mockPalettes,
      });

    render(<RecentItems />);

    expect(screen.getByText('No images added yet')).toBeInTheDocument();
  });

  it('shows empty message when no palettes exist', async () => {
    const user = userEvent.setup();
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValue({
        images: mockImages,
        palettes: [],
      });

    render(<RecentItems />);

    const palettesTab = screen.getByRole('tab', { name: /palettes/i });
    await user.click(palettesTab);

    expect(screen.getByText('No palettes added yet')).toBeInTheDocument();
  });
});
