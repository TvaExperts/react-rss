import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { mockApiResponse30Products } from '@/__tests__/mocks/mockApiResponse30Products';
import { renderWithReduxAndContext } from '@/__tests__/helpers/renderWithReduxAndContext';
import DetailsPage from '../pages/product/[productId]';
import { mockProduct } from './mocks/mockProduct';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {}, push: vi.fn() };
    },
  };
});

describe('Tests for the Detailed page', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const { getAllByTestId } = renderWithReduxAndContext(
      <DetailsPage
        productsData={mockApiResponse30Products}
        product={mockProduct}
      />
    );

    const productCards = getAllByTestId('product-card');

    expect(productCards.length).toBe(mockApiResponse30Products.products.length);
  });

  it('Verify that the component renders product info', () => {
    const { getByTestId } = renderWithReduxAndContext(
      <DetailsPage
        productsData={mockApiResponse30Products}
        product={mockProduct}
      />
    );

    const detailsElement = getByTestId('product-details');
    expect(detailsElement).toBeInTheDocument();

    const titleElement = getByTestId('product-title');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(mockProduct.title);

    const descriptionElement = getByTestId('product-description');
    expect(descriptionElement).toBeInTheDocument();
    expect(descriptionElement).toHaveTextContent(mockProduct.description);
  });
});
