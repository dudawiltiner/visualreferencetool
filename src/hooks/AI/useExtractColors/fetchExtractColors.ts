import axios from 'axios';

import { ExtractColorsRequest, ExtractColorsResponse } from './types';

export const fetchExtractColors = async (
  request: ExtractColorsRequest
): Promise<ExtractColorsResponse> => {
  const { data } = await axios.post<ExtractColorsResponse>(
    '/api/extract-colors',
    request
  );
  return data;
};
