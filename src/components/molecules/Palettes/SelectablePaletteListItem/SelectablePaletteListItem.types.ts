import { ColorPalette } from '@lib/types';

export interface SelectablePaletteListItemProps {
  palette: ColorPalette;
  isSelected: boolean;
  selectionMode: boolean;
  onSelect: (id: string, selected: boolean) => void;
}
