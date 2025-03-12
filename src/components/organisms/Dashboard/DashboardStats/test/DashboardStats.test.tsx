import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { DashboardStats } from '../DashboardStats';

// Mock DataProvider
jest.mock('@providers/DataProvider/DataProvider', () => ({
  useData: () => ({
    images: [{ id: '1' }, { id: '2' }],
    palettes: [{ id: '1' }, { id: '2' }, { id: '3' }],
    groups: [{ id: '1' }],
    tags: [{ id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }],
  }),
}));

// Mock GroupDistributionChart
jest.mock(
  '../../../../organisms/Dashboard/GroupDistributionChart/GroupDistributionChart',
  () => ({
    GroupDistributionChart: () => (
      <div data-testid="group-distribution-chart" />
    ),
  })
);

// Mock TagUsageChart
jest.mock(
  '../../../../organisms/Dashboard/TagUsageChart/TagUsageChart',
  () => ({
    TagUsageChart: () => <div data-testid="tag-usage-chart" />,
  })
);

describe('DashboardStats', () => {
  it('renders all stat cards with correct values', () => {
    render(<DashboardStats />);

    // Verifica os títulos das cards
    expect(screen.getByText('Total Images')).toBeInTheDocument();
    expect(screen.getByText('Color Palettes')).toBeInTheDocument();
    expect(screen.getByText('Groups')).toBeInTheDocument();
    expect(screen.getByText('Tags')).toBeInTheDocument();

    // Verifica os valores das cards
    expect(screen.getByText('2')).toBeInTheDocument(); // Images
    expect(screen.getByText('3')).toBeInTheDocument(); // Palettes
    expect(screen.getByText('1')).toBeInTheDocument(); // Groups
    expect(screen.getByText('4')).toBeInTheDocument(); // Tags
  });

  it('renders usage statistics section', () => {
    render(<DashboardStats />);

    expect(screen.getByText('Usage Statistics')).toBeInTheDocument();
    expect(screen.getByText('Group Distribution')).toBeInTheDocument();
    expect(screen.getByText('Tag Usage')).toBeInTheDocument();
  });

  it('shows group distribution chart by default', () => {
    render(<DashboardStats />);

    expect(screen.getByTestId('group-distribution-chart')).toBeInTheDocument();
  });

  it('switches to tag usage chart when tag tab is clicked', async () => {
    const user = userEvent.setup();
    render(<DashboardStats />);

    const tagTab = screen.getByRole('tab', { name: /tag usage/i });
    await user.click(tagTab);

    expect(screen.getByTestId('tag-usage-chart')).toBeInTheDocument();
  });
});
