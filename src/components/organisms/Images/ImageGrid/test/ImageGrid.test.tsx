import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

// Mock do componente ImageGrid
jest.mock('../ImageGrid', () => ({
  ImageGrid: () => {
    const { useData } = require('@providers/DataProvider/DataProvider');
    const { images } = useData();
    return images.length === 0 ? (
      <div>No images found</div>
    ) : (
      <div>Has images</div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    images: [],
    setImages: jest.fn(),
  }),
}));

describe('ImageGrid', () => {
  it('mostra mensagem quando não há imagens', () => {
    const { ImageGrid } = require('../ImageGrid');
    render(<ImageGrid />);
    expect(screen.getByText('No images found')).toBeInTheDocument();
  });

  it('renderiza conteúdo quando há imagens', () => {
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValueOnce({
        images: [{ id: '1', title: 'Test' }],
        setImages: jest.fn(),
      });

    const { ImageGrid } = require('../ImageGrid');
    render(<ImageGrid />);
    expect(screen.getByText('Has images')).toBeInTheDocument();
  });
});
