import { Image } from '@hooks/AI/useGenerateCompanyContent';

export interface ImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image?: Image;
}

export interface Group {
  id: string;
  name: string;
}

export interface Tag {
  id: string;
  name: string;
}

export interface FormData {
  title: string;
  url: string;
  groupId: string;
  tagIds: string[];
  comment: string;
}

export interface FormChangeEvent {
  target: {
    name: string;
    value: string | string[];
  };
}
