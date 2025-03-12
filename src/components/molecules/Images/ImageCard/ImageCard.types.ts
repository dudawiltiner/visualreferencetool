import { Image } from '@hooks/AI/useGenerateCompanyContent';

export interface ImageCardProps {
  image: Image;
  onSelect?: (id: string) => void;
  isSelected?: boolean;
}
