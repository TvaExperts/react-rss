import { defer, LoaderFunctionArgs } from 'react-router-dom';
import { getProductByIdPromise } from '../services/api';

export async function productDetailsLoader({ params }: LoaderFunctionArgs) {
  return defer({
    productResponsePromise: getProductByIdPromise(params.productId || ''),
  });
}
