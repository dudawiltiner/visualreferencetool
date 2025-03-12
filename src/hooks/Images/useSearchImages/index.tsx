import { useMutation } from '@tanstack/react-query';

import { fetchSearchImages } from './fetchSearchImages';
import {
  SearchImagesError,
  SearchImagesRequest,
  SearchImagesResponse,
} from './types';

export const useSearchImages = () => {
  return useMutation<
    SearchImagesResponse,
    SearchImagesError,
    SearchImagesRequest
  >({
    mutationFn: fetchSearchImages,
    onError: (error: SearchImagesError) => {
      console.error('Error searching for images:', error);
    },
  });
};

export type {
  SearchImage,
  SearchImagesError,
  SearchImagesRequest,
  SearchImagesResponse,
} from './types';
