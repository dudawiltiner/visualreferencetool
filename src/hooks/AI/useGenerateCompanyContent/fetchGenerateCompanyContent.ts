import axios from 'axios';

import {
  GenerateCompanyContentRequest,
  GenerateCompanyContentResponse,
} from './types';

export const fetchGenerateCompanyContent = async (
  request: GenerateCompanyContentRequest
): Promise<GenerateCompanyContentResponse> => {
  const { data } = await axios.post<GenerateCompanyContentResponse>(
    '/api/generate-company-content',
    request
  );
  return data;
};
