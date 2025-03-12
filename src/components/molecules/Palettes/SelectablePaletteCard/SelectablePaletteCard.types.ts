import { ColorPalette } from '@lib/types';

export interface SelectablePaletteCardProps {
  palette: ColorPalette;
  isSelected: boolean;
  selectionMode: boolean;
  onSelect: (id: string, selected: boolean) => void;
}
