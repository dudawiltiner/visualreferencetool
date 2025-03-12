import { Tag } from '@hooks/AI/useGenerateTags';

export interface AIFeaturesProps {
  imageUrl: string;
  onTagsGenerated: (tags: Tag[]) => void;
  onColorsExtracted: (colors: string[]) => void;
}
