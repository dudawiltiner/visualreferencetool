export interface SearchImagesRequest {
  query: string;
}

export interface SearchImage {
  title: string;
  url: string;
  thumbnail: string;
}

export interface SearchImagesResponse {
  results: SearchImage[];
}

export type SearchImagesError = {
  message: string;
};
