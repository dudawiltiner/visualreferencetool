import axios from 'axios';

import { SearchImagesRequest, SearchImagesResponse } from './types';

export const fetchSearchImages = async (
  request: SearchImagesRequest
): Promise<SearchImagesResponse> => {
  const { data } = await axios.post<SearchImagesResponse>(
    '/api/search-images',
    request
  );
  return data;
};
