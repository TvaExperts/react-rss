export const PRODUCTS_PER_PAGE = 15;

export const SEARCH_PARAMETERS = {
  page: 'page',
  query: 'query',
} as const;

export interface AppSearchParams {
  page: number;
  query: string;
}
