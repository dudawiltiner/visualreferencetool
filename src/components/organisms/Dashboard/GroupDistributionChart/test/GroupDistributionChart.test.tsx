import type { ColorPalette, Group, Image } from '@lib/types';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { GroupDistributionChart } from '../GroupDistributionChart';

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

describe('GroupDistributionChart', () => {
  const mockGroups: Group[] = [
    {
      id: '1',
      name: 'Group 1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Group 2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  const mockImages: Image[] = [
    {
      id: '1',
      title: 'Image 1',
      url: 'url1',
      groupId: '1',
      tagIds: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      title: 'Image 2',
      url: 'url2',
      groupId: '1',
      tagIds: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      title: 'Image 3',
      url: 'url3',
      groupId: '2',
      tagIds: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '4',
      title: 'Image 4',
      url: 'url4',
      groupId: null,
      tagIds: [],
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  const mockPalettes: ColorPalette[] = [
    {
      id: '1',
      name: 'Palette 1',
      colors: [],
      groupId: '1',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '2',
      name: 'Palette 2',
      colors: [],
      groupId: '2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '3',
      name: 'Palette 3',
      colors: [],
      groupId: '2',
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '4',
      name: 'Palette 4',
      colors: [],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
    {
      id: '5',
      name: 'Palette 5',
      colors: [],
      groupId: null,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    },
  ];

  it('renders chart with correct data distribution', () => {
    render(
      <GroupDistributionChart
        groups={mockGroups}
        images={mockImages}
        palettes={mockPalettes}
      />
    );

    const chartData = JSON.parse(
      screen.getByTestId('chart-data').textContent || ''
    );

    // Verifica se os dados estão corretos para cada grupo
    expect(chartData).toEqual([
      {
        name: 'Group 1',
        images: 2,
        palettes: 1,
        total: 3,
      },
      {
        name: 'Group 2',
        images: 1,
        palettes: 2,
        total: 3,
      },
      {
        name: 'Ungrouped',
        images: 1,
        palettes: 2,
        total: 3,
      },
    ]);
  });

  it('configures chart series correctly', () => {
    render(
      <GroupDistributionChart
        groups={mockGroups}
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

  it('shows empty message when no groups exist', () => {
    render(<GroupDistributionChart groups={[]} images={[]} palettes={[]} />);

    expect(screen.getByTestId('chart-empty-message')).toHaveTextContent(
      'No groups created yet'
    );
  });

  it('enables scrollbar when there are more than 8 groups', () => {
    const manyGroups: Group[] = Array.from({ length: 10 }, (_, i) => ({
      id: String(i + 1),
      name: `Group ${i + 1}`,
      createdAt: '2024-01-01',
      updatedAt: '2024-01-01',
    }));

    render(
      <GroupDistributionChart groups={manyGroups} images={[]} palettes={[]} />
    );

    expect(screen.getByTestId('chart-scrollbar')).toHaveTextContent('true');
  });

  it('disables scrollbar when there are 8 or fewer groups', () => {
    render(
      <GroupDistributionChart
        groups={mockGroups}
        images={mockImages}
        palettes={mockPalettes}
      />
    );

    expect(screen.getByTestId('chart-scrollbar')).toHaveTextContent('false');
  });
});
