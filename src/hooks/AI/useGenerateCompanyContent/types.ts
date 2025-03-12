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

export interface GeneratedTag {
  name: string;
}

export interface GeneratedGroup {
  name: string;
  description: string;
}

export interface GeneratedPalette {
  name: string;
  colors: string[];
  comment: string;
}

export interface ImageContent {
  title: string;
  comment: string;
  suggestedTags: string[];
}

export interface GeneratedContent {
  tags: GeneratedTag[];
  groups: GeneratedGroup[];
  palettes: GeneratedPalette[];
  images: ImageContent[];
}

export interface SearchImage {
  url: string;
  title: string;
  thumbnail: string;
}

export interface SearchResult {
  term: string;
  images: SearchImage[];
}
