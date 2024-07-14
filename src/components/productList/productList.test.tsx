import { RouteObject } from 'react-router-dom';

import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { TEXTS } from '../../texts';
import { ProductList } from './productList';
import { mockArrOf7Products } from '../../tests/mocks/mockArrOf7Products';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';

describe('Product List tests', () => {
  it('Component renders the specified number of cards', () => {
    const routeObject: RouteObject = {
      element: <ProductList products={mockArrOf7Products} isLoading={false} />,
      path: '/',
    };

    const { getAllByRole } = renderWithRouter(routeObject);

    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf7Products.length);
  });

  it('Component renders the specified number of cards', () => {
    const routeObject: RouteObject = {
      element: <ProductList products={mockArrOf30Products} isLoading={false} />,
      path: '/',
    };

    const { getAllByRole } = renderWithRouter(routeObject);

    const listItems = getAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf30Products.length);
  });

  it('Component renders warning message if no cards are present.', () => {
    const routeObject: RouteObject = {
      element: <ProductList products={[]} isLoading={false} />,
      path: '/',
    };

    const { getByText } = renderWithRouter(routeObject);

    const warningMessageElement = getByText(TEXTS.NOT_FOUND);

    expect(warningMessageElement).toBeInTheDocument();
  });
});
