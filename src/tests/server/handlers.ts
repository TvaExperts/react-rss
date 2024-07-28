import { http, HttpResponse, delay } from 'msw';

import { mockArrOf30Products } from '../mocks/mockArrOf30Products';
import { mockOneProduct } from '../mocks/mockOneProduct';
import { BASE_URL } from '../../services/api';

export const handlers = [
  http.get(`${BASE_URL}/${mockOneProduct.id}`, async () => {
    await delay(500);
    return HttpResponse.json(mockOneProduct);
  }),
  http.get(`${BASE_URL}*`, () => {
    return HttpResponse.json({ total: 30, products: mockArrOf30Products });
  }),
];
