export interface ExtractColorsRequest {
  imageUrl: string;
}

export interface ExtractColorsResponse {
  colors: string[];
}

export type ExtractColorsError = {
  message: string;
};
