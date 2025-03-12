import { useMutation } from '@tanstack/react-query';

import { generateCompanyContentAction } from './actions';
import {
  GenerateCompanyContentError,
  GenerateCompanyContentRequest,
  GenerateCompanyContentResponse,
} from './types';

export function useGenerateCompanyContent() {
  return useMutation<
    GenerateCompanyContentResponse,
    GenerateCompanyContentError,
    GenerateCompanyContentRequest
  >({
    mutationFn: async ({ companyName }) => {
      return generateCompanyContentAction(companyName);
    },
    onError: (error) => {
      console.error('Error generating company content:', error);
    },
  });
}

export type {
  GenerateCompanyContentError,
  GenerateCompanyContentRequest,
  GenerateCompanyContentResponse,
  Group,
  Palette,
  Tag,
} from './types';
