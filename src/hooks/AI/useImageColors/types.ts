export interface UseImageColorsOptions {
  manual?: boolean;
}

export interface UseImageColorsReturn {
  colors: string[];
  isLoading: boolean;
  error: string | null;
  extractColors: () => Promise<string[]>;
}

export interface UseImageColorsProps {
  imageUrl: string | null;
  options?: UseImageColorsOptions;
}
