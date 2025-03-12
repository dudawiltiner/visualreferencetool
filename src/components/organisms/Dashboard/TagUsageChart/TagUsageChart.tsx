'use client';

import type { ColorPalette, Image, Tag } from '@lib/types';
import { StackedBarChart } from '@molecules/Charts/StackedBarChart/StackedBarChart';

interface TagUsageChartProps {
  images: Image[];
  palettes: ColorPalette[];
  tags: Tag[];
}

export function TagUsageChart({ images, palettes, tags }: TagUsageChartProps) {
  const calculateTagUsage = () => {
    const tagData = tags.map((tag) => {
      const imageCount = images.filter((image) =>
        image.tagIds.includes(tag.id)
      ).length;
      const paletteCount = palettes.filter((palette) =>
        palette?.tagIds?.includes(tag.id)
      ).length;

      return {
        name: tag.name,
        images: imageCount,
        palettes: paletteCount,
        total: imageCount + paletteCount,
      };
    });

    // Sort by total and take the top 15
    return tagData.sort((a, b) => b.total - a.total).slice(0, 15);
  };

  const chartData = calculateTagUsage();
  const chartSeries = [
    { name: 'Images', field: 'images' },
    { name: 'Palettes', field: 'palettes' },
  ];

  return (
    <StackedBarChart
      id="tag-usage-chart"
      data={chartData}
      series={chartSeries}
      emptyMessage="No tags created yet"
      showScrollbar={true}
    />
  );
}
