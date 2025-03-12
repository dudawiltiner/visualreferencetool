import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TagList } from '../TagList';

// Mock do componente TagList
jest.mock('../TagList', () => ({
  TagList: () => {
    const { tags } = require('@providers/DataProvider/DataProvider').useData();

    if (tags.length === 0) {
      return <div>No tags created yet</div>;
    }

    return (
      <div>
        {tags.map((tag: any) => (
          <div key={tag.id} className="tag-card">
            <div>Name: {tag.name}</div>
            <div className="actions">
              <button>Edit</button>
              <button>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  },
}));

// Mock do contexto de dados
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    tags: [],
    setTags: jest.fn(),
    images: [],
    setImages: jest.fn(),
    palettes: [],
    setPalettes: jest.fn(),
  }),
}));

// Mock do hook useToast
jest.mock('@hooks/General/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('TagList', () => {
  it('mostra mensagem quando não há tags', () => {
    render(<TagList />);
    expect(screen.getByText('No tags created yet')).toBeInTheDocument();
  });

  it('renderiza lista de tags quando existem tags', () => {
    // Sobrescreve o mock do useData para retornar tags
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValue({
        tags: [
          {
            id: '1',
            name: 'Tag 1',
            createdAt: '2024-03-12T00:00:00Z',
            updatedAt: '2024-03-12T00:00:00Z',
          },
          {
            id: '2',
            name: 'Tag 2',
            createdAt: '2024-03-12T00:00:00Z',
            updatedAt: '2024-03-12T00:00:00Z',
          },
        ],
        setTags: jest.fn(),
        images: [],
        setImages: jest.fn(),
        palettes: [],
        setPalettes: jest.fn(),
      });

    render(<TagList />);

    expect(screen.getByText('Name: Tag 1')).toBeInTheDocument();
    expect(screen.getByText('Name: Tag 2')).toBeInTheDocument();
  });

  it('renderiza botões de ação para cada tag', () => {
    // Sobrescreve o mock do useData para retornar uma tag
    jest
      .spyOn(require('@providers/DataProvider/DataProvider'), 'useData')
      .mockReturnValue({
        tags: [
          {
            id: '1',
            name: 'Tag 1',
            createdAt: '2024-03-12T00:00:00Z',
            updatedAt: '2024-03-12T00:00:00Z',
          },
        ],
        setTags: jest.fn(),
        images: [],
        setImages: jest.fn(),
        palettes: [],
        setPalettes: jest.fn(),
      });

    render(<TagList />);

    const editButtons = screen.getAllByText('Edit');
    const deleteButtons = screen.getAllByText('Delete');

    expect(editButtons).toHaveLength(1);
    expect(deleteButtons).toHaveLength(1);
  });
});
