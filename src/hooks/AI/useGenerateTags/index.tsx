import { useMutation } from '@tanstack/react-query';

import { fetchGenerateTags } from './fetchGenerateTags';
import {
  GenerateTagsError,
  GenerateTagsRequest,
  GenerateTagsResponse,
} from './types';

export const useGenerateTags = () => {
  return useMutation<
    GenerateTagsResponse,
    GenerateTagsError,
    GenerateTagsRequest
  >({
    mutationFn: fetchGenerateTags,
    onError: (error: GenerateTagsError) => {
      console.error('Error generating tags:', error);
    },
  });
};

export type {
  GenerateTagsError,
  GenerateTagsRequest,
  GenerateTagsResponse,
  Tag,
} from './types';
