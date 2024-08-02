import '@testing-library/jest-dom';
import { vi } from 'vitest';
import { MainContainer } from '@/components/mainContainer/mainContainer';
import { mockApiResponse30Products } from '@/__tests__/mocks/mockApiResponse30Products';
import { renderWithReduxAndContext } from '@/__tests__/helpers/renderWithReduxAndContext';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: {}, push: vi.fn() };
    },
  };
});

describe('Tests for the Main container component', () => {
  it('Verify that the component renders the specified number of cards', () => {
    const { getAllByTestId } = renderWithReduxAndContext(
      <MainContainer productsApiResponse={mockApiResponse30Products} />
    );

    const productCards = getAllByTestId('product-card');

    expect(productCards.length).toBe(mockApiResponse30Products.products.length);
  });
});
