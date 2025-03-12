import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { StackedBarChart } from '../StackedBarChart';

// Mock do amCharts
jest.mock('@amcharts/amcharts5/index', () => ({
  Root: {
    new: jest.fn(() => ({
      setThemes: jest.fn(),
      container: {
        children: {
          push: jest.fn(),
        },
      },
      dispose: jest.fn(),
    })),
  },
  Theme: {
    new: jest.fn(() => ({
      rule: jest.fn(() => ({
        setAll: jest.fn(),
      })),
    })),
  },
  color: jest.fn(),
  p50: 50,
  percent: jest.fn(),
}));

jest.mock('@amcharts/amcharts5/themes/Animated', () => ({
  __esModule: true,
  default: {
    new: jest.fn(),
  },
}));

jest.mock('@amcharts/amcharts5/xy', () => ({
  XYChart: {
    new: jest.fn(() => ({
      yAxes: { push: jest.fn() },
      xAxes: { push: jest.fn() },
      series: { push: jest.fn() },
      children: { push: jest.fn() },
      appear: jest.fn(),
    })),
  },
  AxisRendererY: {
    new: jest.fn(() => ({
      grid: {
        template: {
          setAll: jest.fn(),
        },
      },
    })),
  },
  AxisRendererX: {
    new: jest.fn(),
  },
  CategoryAxis: {
    new: jest.fn(() => ({
      data: {
        setAll: jest.fn(),
      },
      get: jest.fn(() => ({
        labels: {
          template: {
            setAll: jest.fn(),
          },
        },
      })),
    })),
  },
  ValueAxis: {
    new: jest.fn(() => ({
      get: jest.fn(() => ({
        labels: {
          template: {
            setAll: jest.fn(),
          },
        },
      })),
    })),
  },
  ColumnSeries: {
    new: jest.fn(() => ({
      columns: {
        template: {
          setAll: jest.fn(),
        },
      },
      data: {
        setAll: jest.fn(),
      },
      appear: jest.fn(),
    })),
  },
}));

// Mock do DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    isDarkMode: false,
  }),
}));

describe('StackedBarChart', () => {
  const mockData = [
    { name: 'Category 1', value1: 10, value2: 20 },
    { name: 'Category 2', value1: 15, value2: 25 },
  ];

  const mockSeries = [
    { name: 'Series 1', field: 'value1' },
    { name: 'Series 2', field: 'value2' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders empty message when data is empty', () => {
    render(
      <StackedBarChart
        id="test-chart"
        data={[]}
        series={mockSeries}
        emptyMessage="No data available"
      />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('renders chart container when data is provided', () => {
    render(
      <StackedBarChart
        id="test-chart"
        data={mockData}
        series={mockSeries}
        emptyMessage="No data available"
      />
    );

    expect(screen.getByTestId('test-chart')).toBeInTheDocument();
  });

  it('renders chart with scrollbar when showScrollbar is true', () => {
    render(
      <StackedBarChart
        id="test-chart"
        data={mockData}
        series={mockSeries}
        emptyMessage="No data available"
        showScrollbar={true}
      />
    );

    expect(screen.getByTestId('test-chart')).toBeInTheDocument();
  });

  it('renders chart without scrollbar when showScrollbar is false', () => {
    render(
      <StackedBarChart
        id="test-chart"
        data={mockData}
        series={mockSeries}
        emptyMessage="No data available"
        showScrollbar={false}
      />
    );

    expect(screen.getByTestId('test-chart')).toBeInTheDocument();
  });
});
