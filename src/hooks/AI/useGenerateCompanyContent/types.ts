export interface GenerateCompanyContentRequest {
  companyName: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Palette {
  id: string;
  name: string;
  colors: string[];
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  id: string;
  title: string;
  url: string;
  groupId: string | null;
  thumbnail?: string;
  comment: string;
  tagIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GenerateCompanyContentResponse {
  tags: Tag[];
  groups: Group[];
  palettes: Palette[];
  images: Image[];
}

export type GenerateCompanyContentError = {
  message: string;
};
