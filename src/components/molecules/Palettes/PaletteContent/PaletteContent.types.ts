import { ColorPalette, EditingColor } from '@lib/types';

export interface PaletteContentProps {
  palette: ColorPalette;
  editingColor: EditingColor | null;
  copiedColor: string | null;
  handleColorChange: (
    paletteId: string,
    colorIndex: number,
    newColor: string
  ) => void;
  copyColor: (color: string) => void;
  hexToRgb: (hex: string) => string;
  hexToHsl: (hex: string) => string;
}
