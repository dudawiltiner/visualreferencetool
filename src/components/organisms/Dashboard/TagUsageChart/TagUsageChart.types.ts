import type { ColorPalette, Image, Tag } from "@lib/types";

export interface TagUsageChartProps {
  images: Image[];
  palettes: ColorPalette[];
  tags: Tag[];
}
