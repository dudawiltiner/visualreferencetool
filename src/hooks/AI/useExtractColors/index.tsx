import { useMutation } from '@tanstack/react-query';

import { fetchExtractColors } from './fetchExtractColors';
import {
  ExtractColorsError,
  ExtractColorsRequest,
  ExtractColorsResponse,
} from './types';

export const useExtractColors = () => {
  return useMutation<
    ExtractColorsResponse,
    ExtractColorsError,
    ExtractColorsRequest
  >({
    mutationFn: fetchExtractColors,
    onError: (error: ExtractColorsError) => {
      console.error('Error extracting colors:', error);
    },
  });
};

export type {
  ExtractColorsError,
  ExtractColorsRequest,
  ExtractColorsResponse,
} from './types';
