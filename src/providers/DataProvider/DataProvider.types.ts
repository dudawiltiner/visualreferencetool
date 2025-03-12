import type { Group, Image, Tag } from '@hooks/AI/useGenerateCompanyContent';

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
