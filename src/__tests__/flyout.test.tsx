import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { ProductList } from '@/components/productList/productList';
import { mockApiResponse30Products } from '@/__tests__/mocks/mockApiResponse30Products';
import { renderWithReduxAndContext } from '@/__tests__/helpers/renderWithReduxAndContext';
import { userEvent } from '@testing-library/user-event';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {} };
    },
  };
});

describe('Tests for the Product List component', () => {
  it('Verify that the component renders the specified number of cards', async () => {
    const { queryByTestId, getAllByTestId } = renderWithReduxAndContext(
      <ProductList productsApiResponse={mockApiResponse30Products} />
    );

    let flyout = queryByTestId('flyout');
    expect(flyout).toBe(null);

    const checkBoxesOfCards = getAllByTestId(
      'select-product'
    ) as HTMLInputElement[];

    expect(checkBoxesOfCards.length).toBe(
      mockApiResponse30Products.products.length
    );

    await userEvent.click(checkBoxesOfCards[0]);
    flyout = queryByTestId('flyout');
    expect(flyout).not.toBe(null);
    expect(flyout).toBeInTheDocument();
  });
});
