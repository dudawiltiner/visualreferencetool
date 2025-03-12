export const useGenerateTags = jest.fn(() => ({
  mutate: jest.fn(),
  isPending: false,
  isError: false,
  error: null,
  data: null,
}));
