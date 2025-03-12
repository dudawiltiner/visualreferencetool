import axios from 'axios';

import { GenerateTagsRequest, GenerateTagsResponse } from './types';

export const fetchGenerateTags = async (
  request: GenerateTagsRequest
): Promise<GenerateTagsResponse> => {
  const { data } = await axios.post<GenerateTagsResponse>(
    '/api/generate-tags',
    request
  );
  return data;
};
