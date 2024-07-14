import { http, HttpResponse } from 'msw';

import { mockArrOf30Products } from '../mocks/mockArrOf30Products';
import { mockOneProduct } from '../mocks/mockOneProduct';
import { API_URL } from '../../services/api';

export const handlers = [
  http.get(`${API_URL}/`, () => {
    return HttpResponse.json({ total: 30, products: mockArrOf30Products });
  }),
  http.get(`${API_URL}/*`, () => {
    return HttpResponse.json(mockOneProduct);
  }),
];
