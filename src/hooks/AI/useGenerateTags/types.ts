export interface GenerateTagsRequest {
  imageUrl: string;
}

export interface Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface GenerateTagsResponse {
  tags: Tag[];
  isMock?: boolean;
}

export type GenerateTagsError = {
  message: string;
};
