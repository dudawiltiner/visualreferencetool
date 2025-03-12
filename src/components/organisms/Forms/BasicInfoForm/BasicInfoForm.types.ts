import { Tag } from '@hooks/AI/useGenerateTags';

export interface FormData {
  title: string;
  url: string;
  groupId: string;
  tagIds: string[];
  comment: string;
}

export interface Group {
  id: string;
  name: string;
}

export interface FormChangeEvent {
  target: {
    name: string;
    value: string | string[];
  };
}

export interface BasicInfoFormProps {
  formData: FormData;
  groups: Group[];
  tags: Tag[];
  image?: { id: string };
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | FormChangeEvent
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}
