import { RouteObject } from 'react-router-dom';

import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { TEXTS } from '../../texts';
import { ProductList } from './productList';

const routeObject: RouteObject = {
  element: <ProductList products={[]} isLoading={false} />,
  path: '/',
};

describe('Product List tests', () => {
  // it('Component renders the specified number of cards', () => {
  //   const state: AppState = {
  //     products: mockArrOf10Products,
  //     total: mockArrOf10Products.length,
  //     page: 1,
  //     limit: 10,
  //     query: '',
  //   };
  //
  //   const { getAllByRole } = renderWithRouterAndContext(
  //     routeObject,
  //     routes,
  //     '/',
  //     state
  //   );
  //   const listItems = getAllByRole('listitem');
  //   expect(listItems.length).toBe(mockArrOf10Products.length);
  // });

  it('Component renders warning message if no cards are present.', () => {
    const { getByText } = renderWithRouter(routeObject);

    const warningMessageElement = getByText(TEXTS.NOT_FOUND);

    expect(warningMessageElement).toBeInTheDocument();
  });
});
