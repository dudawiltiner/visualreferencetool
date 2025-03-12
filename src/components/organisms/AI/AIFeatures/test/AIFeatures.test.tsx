import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { AIFeatures } from '../AIFeatures';

// Mock AITagGenerator
jest.mock('@molecules/AI/AITagGenerator/AITagGenerator', () => ({
  AITagGenerator: () => (
    <div data-testid="ai-tag-generator">Mock AITagGenerator</div>
  ),
}));

// Mock AIColorExtractor
jest.mock('@molecules/AI/AIColorExtractor/AIColorExtractor', () => ({
  AIColorExtractor: () => (
    <div data-testid="ai-color-extractor">Mock AIColorExtractor</div>
  ),
}));

describe('AIFeatures', () => {
  const mockProps = {
    imageUrl: 'https://example.com/image.jpg',
    onTagsGenerated: jest.fn(),
    onColorsExtracted: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders API key alert', () => {
    render(<AIFeatures {...mockProps} />);

    expect(screen.getByText('AI Features Require API Key')).toBeInTheDocument();
    expect(
      screen.getByText(/To use AI features, add your OpenAI API key/)
    ).toBeInTheDocument();
  });

  it('renders message when no image URL is provided', () => {
    render(<AIFeatures {...mockProps} imageUrl="" />);

    expect(
      screen.getByText('Please enter an image URL in the Basic Info tab first')
    ).toBeInTheDocument();
  });

  it('renders image preview and AI components when image URL is provided', () => {
    render(<AIFeatures {...mockProps} />);

    // Verifica se a imagem está presente
    const image = screen.getByAltText('Preview');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProps.imageUrl);

    // Verifica se os componentes AI estão presentes
    expect(screen.getByTestId('ai-tag-generator')).toBeInTheDocument();
    expect(screen.getByTestId('ai-color-extractor')).toBeInTheDocument();
  });

  it('handles image load error by showing placeholder', () => {
    render(<AIFeatures {...mockProps} />);

    const image = screen.getByAltText('Preview');
    fireEvent.error(image);

    expect(image).toHaveAttribute(
      'src',
      '/placeholder.svg?height=300&width=300'
    );
  });

  it('renders section titles correctly', () => {
    render(<AIFeatures {...mockProps} />);

    expect(screen.getByText('Generate Tags')).toBeInTheDocument();
    expect(screen.getByText('Extract Color Palette')).toBeInTheDocument();
  });
});
