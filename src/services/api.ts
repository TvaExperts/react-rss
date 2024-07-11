import axios from 'axios';
import { Product } from '../models/product';

const API_URL = 'https://dummyjson.com/products';

const PRODUCTS_PER_PAGE = 10;

interface ProductsApiResponse {
  total: number;
  products: Product[];
}

// interface ProductApiResponse {
//   data: Product;
// }

interface RequestParams {
  query?: string;
  page?: number;
}

function createRequestUrl({ query, page }: RequestParams) {
  const searchParams = new URLSearchParams();

  if (page) searchParams.set('skip', (page * PRODUCTS_PER_PAGE).toString());
  if (query) searchParams.set('q', query);
  searchParams.set('limit', PRODUCTS_PER_PAGE.toString());

  return `${API_URL}${query ? '/search?' : '?'}${searchParams.toString()}`;
}

async function getProductsFromApi(
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

export { getProductsFromApi };
export type { ProductsApiResponse };
