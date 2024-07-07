import axios from 'axios';
import { Product } from '../models/product';

const API_URL = 'https://dummyjson.com/products';

type ProductsApiResponse = {
  total: number;
  products: Product[];
};

async function getProductsFromApi(
  query?: string
): Promise<ProductsApiResponse> {
  try {
    const requestUrl = query ? `${API_URL}/search?q=${query}` : `${API_URL}`;

    const response = await axios.get(requestUrl);

    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export { getProductsFromApi };
export type { ProductsApiResponse };
