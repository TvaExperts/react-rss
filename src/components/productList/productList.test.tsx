import { vi } from 'vitest';
import { TEXTS } from '../../../public/texts';
import { ProductList } from './productList';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';
import { renderWithRouterReduxContext } from '../../tests/helpers/renderWithRouterReduxContext';
import * as api from '../../services/api';

describe('Product List tests', () => {
  it('Component renders the specified number of cards', async () => {
    const { findAllByRole } = renderWithRouterReduxContext(<ProductList />);
    const listItems = await findAllByRole('listitem');
    expect(listItems.length).toBe(mockArrOf30Products.length);
  });

  it('Component renders warning message if no cards are present.', async () => {
    vi.spyOn(api, 'useGetProductsByParamsQuery').mockImplementation(
      vi.fn().mockImplementation(() => {
        return {
          isError: false,
          isFetching: false,
          data: {
            total: 0,
            products: [],
          },
        };
      })
    );

    const { getByText } = renderWithRouterReduxContext(<ProductList />);
    const warningMessageElement = getByText(TEXTS.NOT_FOUND);

    expect(warningMessageElement).toBeInTheDocument();
  });
});
