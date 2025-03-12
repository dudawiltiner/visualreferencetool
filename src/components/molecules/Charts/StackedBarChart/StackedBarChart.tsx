'use client';

import { useEffect, useRef } from 'react';

import * as am5 from '@amcharts/amcharts5/index';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import * as am5xy from '@amcharts/amcharts5/xy';
import { useData } from '@providers/DataProvider/DataProvider';

interface StackedBarChartProps {
  id: string;
  data: Array<{
    name: string;
    [key: string]: any;
  }>;
  series: Array<{
    name: string;
    field: string;
  }>;
  emptyMessage: string;
  showScrollbar?: boolean;
}

export function StackedBarChart({
  id,
  data,
  series,
  emptyMessage,
  showScrollbar = true,
}: StackedBarChartProps) {
  const chartRef = useRef<am5.Root | null>(null);
  const { isDarkMode } = useData();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initChart = () => {
      if (!document.getElementById(id)) return;

      if (chartRef.current) {
        chartRef.current.dispose();
      }

      const root = am5.Root.new(id);
      chartRef.current = root;

      const myTheme = am5.Theme.new(root);
      myTheme.rule('Grid', ['base']).setAll({
        strokeOpacity: 0.1,
      });

      myTheme.rule('Label').setAll({
        fill: isDarkMode ? am5.color(0xffffff) : am5.color(0x000000),
      });

      myTheme.rule('Text').setAll({
        fill: isDarkMode ? am5.color(0xffffff) : am5.color(0x000000),
      });

      root.setThemes([am5themes_Animated.new(root), myTheme]);

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          wheelX: 'panY',
          wheelY: 'zoomY',
          paddingLeft: 0,
          layout: root.verticalLayout,
        })
      );

      if (showScrollbar) {
        chart.set(
          'scrollbarY',
          am5.Scrollbar.new(root, {
            orientation: 'vertical',
          })
        );
      }

      // Create Y-axis (categories)
      const yRenderer = am5xy.AxisRendererY.new(root, {});
      const yAxis = chart.yAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: 'name',
          renderer: yRenderer,
          tooltip: am5.Tooltip.new(root, {}),
        })
      );

      yRenderer.grid.template.setAll({
        location: 1,
      });

      yAxis.get('renderer').labels.template.setAll({
        fill: isDarkMode ? am5.color(0xffffff) : am5.color(0x000000),
      });

      yAxis.data.setAll(data);

      // Create X-axis (values)
      const xAxis = chart.xAxes.push(
        am5xy.ValueAxis.new(root, {
          min: 0,
          maxPrecision: 0,
          renderer: am5xy.AxisRendererX.new(root, {
            minGridDistance: 40,
            strokeOpacity: 0.1,
          }),
        })
      );

      xAxis.get('renderer').labels.template.setAll({
        fill: isDarkMode ? am5.color(0xffffff) : am5.color(0x000000),
      });

      // Add legend
      const legend = chart.children.push(
        am5.Legend.new(root, {
          centerX: am5.p50,
          x: am5.p50,
        })
      );

      legend.labels.template.setAll({
        fill: isDarkMode ? am5.color(0xffffff) : am5.color(0x000000),
      });

      // Function to create series
      function makeSeries(name: string, fieldName: string) {
        const series = chart.series.push(
          am5xy.ColumnSeries.new(root, {
            name: name,
            stacked: true,
            xAxis: xAxis,
            yAxis: yAxis,
            baseAxis: yAxis,
            valueXField: fieldName,
            categoryYField: 'name',
          })
        );

        series.columns.template.setAll({
          tooltipText: '{name}: {valueX}',
          tooltipY: am5.percent(90),
        });

        series.data.setAll(data);

        // Make stuff animate on load
        series.appear();

        legend.data.push(series);

        return series;
      }

      // Create series
      series.forEach(({ name, field }) => {
        makeSeries(name, field);
      });

      // Make chart animate on load
      chart.appear(1000, 100);
    };

    const timer = setTimeout(initChart, 100);

    return () => {
      clearTimeout(timer);
      if (chartRef.current) {
        chartRef.current.dispose();
        chartRef.current = null;
      }
    };
  }, [id, data, series, showScrollbar, isDarkMode]);

  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return <div id={id} data-testid={id} className="w-full h-[400px]"></div>;
}
