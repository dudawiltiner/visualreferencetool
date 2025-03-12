import { Group, Image } from '@hooks/AI/useGenerateCompanyContent';
import { Tag } from '@hooks/AI/useGenerateTags';

import type { ColorPalette } from '@lib/types';

export interface DataContextType {
  images: Image[];
  setImages: (images: Image[]) => void;
  palettes: ColorPalette[];
  setPalettes: (palettes: ColorPalette[]) => void;
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  isDarkMode: boolean;
  setIsDarkMode: (isDarkMode: boolean) => void;
}
