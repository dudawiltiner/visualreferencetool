import { Tag } from '@hooks/AI/useGenerateTags';

export interface AITagGeneratorProps {
  imageUrl: string;
  onTagsGenerated: (tags: Tag[]) => void;
}
