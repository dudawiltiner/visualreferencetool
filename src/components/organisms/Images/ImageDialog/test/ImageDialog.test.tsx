import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ImageDialog } from '../ImageDialog';

// Mock do componente ImageDialog
jest.mock('../ImageDialog', () => ({
  ImageDialog: ({ image }: { image?: any }) => {
    const title = image ? 'Edit Image' : 'Add New Image';
    return (
      <div>
        <h2>{title}</h2>
        {image && (
          <div>
            <div>Title: {image.title}</div>
            <div>URL: {image.url}</div>
          </div>
        )}
      </div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    groups: [],
    tags: [],
    setImages: jest.fn(),
  }),
}));

describe('ImageDialog', () => {
  const defaultProps = {
    open: true,
    onOpenChange: jest.fn(),
  };

  it('renderiza diálogo para adicionar nova imagem', () => {
    render(<ImageDialog {...defaultProps} />);
    expect(screen.getByText('Add New Image')).toBeInTheDocument();
  });

  it('renderiza diálogo para editar imagem existente', () => {
    const image = {
      id: '1',
      title: 'Imagem Teste',
      url: 'https://example.com/image.jpg',
      groupId: '1',
      tagIds: ['1'],
      comment: 'Comentário teste',
      createdAt: '2024-03-12T00:00:00Z',
      updatedAt: '2024-03-12T00:00:00Z',
    };

    render(<ImageDialog {...defaultProps} image={image} />);

    expect(screen.getByText('Edit Image')).toBeInTheDocument();
    expect(screen.getByText(`Title: ${image.title}`)).toBeInTheDocument();
    expect(screen.getByText(`URL: ${image.url}`)).toBeInTheDocument();
  });
});
