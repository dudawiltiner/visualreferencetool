import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ImageSearchSection } from '../ImageSearchSection';

jest.mock('@molecules/Images/ImageSearch/ImageSearch', () => ({
  ImageSearch: () => <div data-testid="image-search" />,
}));

describe('ImageSearchSection', () => {
  it('renders image search component', () => {
    render(<ImageSearchSection initialQuery="" onSelectImage={jest.fn()} />);

    expect(screen.getByTestId('image-search')).toBeInTheDocument();
  });
});
