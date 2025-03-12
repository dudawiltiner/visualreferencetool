import { useMutation } from '@tanstack/react-query';

import { fetchGenerateCompanyContent } from './fetchGenerateCompanyContent';
import {
  GenerateCompanyContentError,
  GenerateCompanyContentRequest,
  GenerateCompanyContentResponse,
} from './types';

export const useGenerateCompanyContent = () => {
  return useMutation<
    GenerateCompanyContentResponse,
    GenerateCompanyContentError,
    GenerateCompanyContentRequest
  >({
    mutationFn: fetchGenerateCompanyContent,
    onError: (error: GenerateCompanyContentError) => {
      console.error('Error generating company content:', error);
    },
  });
};

export type {
  GenerateCompanyContentError,
  GenerateCompanyContentRequest,
  GenerateCompanyContentResponse,
  Group,
  Image,
  Palette,
  Tag,
} from './types';
