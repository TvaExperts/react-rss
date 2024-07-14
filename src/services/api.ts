import axios from 'axios';
import { Product } from '../models/product';

export const API_URL = 'https://dummyjson.com/products';

export const PRODUCTS_PER_PAGE = 15;

export const SEARCH_PARAMETERS = {
  page: 'page',
  query: 'query',
} as const;

export interface ProductsApiResponse {
  total: number;
  products: Product[];
}

export interface ProductApiResponse {
  data: Product;
}

interface RequestParams {
  query?: string;
  page?: number;
}

function createRequestUrl({ query, page }: RequestParams) {
  const searchParams = new URLSearchParams();

  if (page && page > 1)
    searchParams.set('skip', ((page - 1) * PRODUCTS_PER_PAGE).toString());
  if (query) searchParams.set('q', query);
  searchParams.set('limit', PRODUCTS_PER_PAGE.toString());

  return `${API_URL}${query ? '/search?' : '?'}${searchParams.toString()}`;
}

export async function getProducts(
  requestParams: RequestParams
): Promise<ProductsApiResponse> {
  const requestUrl = createRequestUrl(requestParams);
  try {
    const response = await axios.get(requestUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function getProductByIdPromise(
  id: string
): Promise<ProductApiResponse> {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    return await res.json();
    // return axios.get(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
