import type { ColorPalette } from '@lib/types';

export interface PaletteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  palette?: ColorPalette;
}
