import {
  UseImageColorsProps,
  UseImageColorsReturn,
} from '../useImageColors/types';

export const useImageColors = jest.fn<
  UseImageColorsReturn,
  [UseImageColorsProps]
>(() => ({
  colors: [],
  isLoading: false,
  error: null,
  extractColors: jest.fn().mockResolvedValue([]),
}));
