import { Group } from '@hooks/AI/useGenerateCompanyContent';
import { Tag } from '@hooks/AI/useGenerateTags';

import { ColorPalette } from '@lib/types';

export interface PaletteHeaderProps {
  palette: ColorPalette;
  group: Group | undefined;
  tags: Tag[];
  onEdit: () => void;
  onDelete: () => void;
}
