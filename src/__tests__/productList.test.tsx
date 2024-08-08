import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { ProductList } from '@/components/productList/productList';
import { mockApiResponse30Products } from '@/__tests__/mocks/mockApiResponse30Products';
import { mockApiResponse7Products } from '@/__tests__/mocks/mockApiResponse7Products';
import { renderWithReduxAndContext } from '@/__tests__/helpers/renderWithReduxAndContext';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {} };
    },
  };
});

describe('Tests for the Product List component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const { getAllByTestId } = renderWithReduxAndContext(
      <ProductList productsApiResponse={mockApiResponse30Products} />
    );

    const titleElement = getAllByTestId('product-card');
    expect(titleElement.length).toBe(mockApiResponse30Products.products.length);
  });

  it('Verify that the component renders the specified number of cards', () => {
    const { getAllByTestId } = renderWithReduxAndContext(
      <ProductList productsApiResponse={mockApiResponse7Products} />
    );

    const titleElement = getAllByTestId('product-card');
    expect(titleElement.length).toBe(mockApiResponse7Products.products.length);
  });

  it('Check that an appropriate message is displayed if no cards are present.', () => {
    const { getByTestId } = renderWithReduxAndContext(
      <ProductList productsApiResponse={{ products: [], total: 0 }} />
    );
    const warningMessageBlock = getByTestId('not-found');
    expect(warningMessageBlock).toBeInTheDocument();
  });
});
