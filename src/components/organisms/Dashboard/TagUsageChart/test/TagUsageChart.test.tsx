import type { ColorPalette, Image, Tag } from '@lib/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TagUsageChart } from '../TagUsageChart';

// Mock StackedBarChart
jest.mock('@molecules/Charts/StackedBarChart/StackedBarChart', () => ({
  StackedBarChart: ({
    data,
    series,
    emptyMessage,
    showScrollbar,
  }: {
    data: any[];
    series: any[];
    emptyMessage: string;
    showScrollbar: boolean;
  }) => (
    <div data-testid="stacked-bar-chart">
      <div data-testid="chart-data">{JSON.stringify(data)}</div>
      <div data-testid="chart-series">{JSON.stringify(series)}</div>
      <div data-testid="chart-empty-message">{emptyMessage}</div>
      <div data-testid="chart-scrollbar">{showScrollbar.toString()}</div>
    </div>
  ),
}));

describe('TagUsageChart', () => {
  const mockTags: Tag[] = [
    {
      id: '1',
      name: 'Tag 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Tag 2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      name: 'Tag 3',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  const mockImages: Image[] = [
    {
      id: '1',
      title: 'Image 1',
      url: 'url1',
      tagIds: ['1', '2'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Image 2',
      url: 'url2',
      tagIds: ['1'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      title: 'Image 3',
      url: 'url3',
      tagIds: ['2'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  const mockPalettes: ColorPalette[] = [
    {
      id: '1',
      name: 'Palette 1',
      colors: [],
      tagIds: ['1', '3'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Palette 2',
      colors: [],
      tagIds: ['2'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      name: 'Palette 3',
      colors: [],
      tagIds: ['3'],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  it('renders chart with correct tag usage data', () => {
    render(
      <TagUsageChart
        tags={mockTags}
        images={mockImages}
        palettes={mockPalettes}
      />
    );

    const chartData = JSON.parse(
      screen.getByTestId('chart-data').textContent || ''
    );

    // Verifica se os dados estão corretos para cada tag
    expect(chartData).toEqual([
      {
        name: 'Tag 1',
        images: 2,
        palettes: 1,
        total: 3,
      },
      {
        name: 'Tag 2',
        images: 2,
        palettes: 1,
        total: 3,
      },
      {
        name: 'Tag 3',
        images: 0,
        palettes: 2,
        total: 2,
      },
    ]);
  });

  it('configures chart series correctly', () => {
    render(
      <TagUsageChart
        tags={mockTags}
        images={mockImages}
        palettes={mockPalettes}
      />
    );

    const chartSeries = JSON.parse(
      screen.getByTestId('chart-series').textContent || ''
    );

    expect(chartSeries).toEqual([
      { name: 'Images', field: 'images' },
      { name: 'Palettes', field: 'palettes' },
    ]);
  });

  it('shows empty message when no tags exist', () => {
    render(<TagUsageChart tags={[]} images={[]} palettes={[]} />);

    expect(screen.getByTestId('chart-empty-message')).toHaveTextContent(
      'No tags created yet'
    );
  });

  it('limits chart data to top 15 tags', () => {
    const manyTags: Tag[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      name: `Tag ${i + 1}`,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }));

    const manyTaggedImages: Image[] = Array.from({ length: 20 }, (_, i) => ({
      id: String(i + 1),
      title: `Image ${i + 1}`,
      url: `url${i + 1}`,
      tagIds: [String(i + 1)],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }));

    render(
      <TagUsageChart tags={manyTags} images={manyTaggedImages} palettes={[]} />
    );

    const chartData = JSON.parse(
      screen.getByTestId('chart-data').textContent || ''
    );
    expect(chartData.length).toBe(15);
  });

  it('always shows scrollbar', () => {
    render(
      <TagUsageChart
        tags={mockTags}
        images={mockImages}
        palettes={mockPalettes}
      />
    );

    expect(screen.getByTestId('chart-scrollbar')).toHaveTextContent('true');
  });
});
