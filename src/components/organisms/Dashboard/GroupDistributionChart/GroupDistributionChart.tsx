'use client';

import type { ColorPalette, Group, Image } from '@lib/types';
import { StackedBarChart } from '@molecules/Charts/StackedBarChart/StackedBarChart';

interface GroupDistributionChartProps {
  images: Image[];
  palettes: ColorPalette[];
  groups: Group[];
}

export function GroupDistributionChart({
  images,
  palettes,
  groups,
}: GroupDistributionChartProps) {
  const calculateGroupDistribution = () => {
    const groupData = groups.map((group) => {
      const imageCount = images.filter(
        (image) => image.groupId === group.id
      ).length;
      const paletteCount = palettes.filter(
        (palette) => palette.groupId === group.id
      ).length;

      return {
        name: group.name,
        images: imageCount,
        palettes: paletteCount,
        total: imageCount + paletteCount,
      };
    });

    const ungroupedImages = images.filter((image) => !image.groupId).length;
    const ungroupedPalettes = palettes.filter(
      (palette) => !palette.groupId
    ).length;

    if (ungroupedImages > 0 || ungroupedPalettes > 0) {
      groupData.push({
        name: 'Ungrouped',
        images: ungroupedImages,
        palettes: ungroupedPalettes,
        total: ungroupedImages + ungroupedPalettes,
      });
    }

    return groupData.sort((a, b) => b.total - a.total);
  };

  const chartData = calculateGroupDistribution();
  const chartSeries = [
    { name: 'Images', field: 'images' },
    { name: 'Palettes', field: 'palettes' },
  ];

  return (
    <StackedBarChart
      id="group-distribution-chart"
      data={chartData}
      series={chartSeries}
      emptyMessage="No groups created yet"
      showScrollbar={groups.length > 8}
    />
  );
}
