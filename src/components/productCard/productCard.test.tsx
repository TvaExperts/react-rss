import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { RouteObject } from 'react-router-dom';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { DESCRIPTION_LENGTH, ProductCard } from './productCard';
import { mockOneProduct } from '../../tests/mocks/mockOneProduct';
import { routes } from '../../router/router';

describe('Tests for the Card component', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('Ensure that the card component renders the relevant card data', () => {
    const routerObject: RouteObject = {
      element: <ProductCard product={mockOneProduct} />,
      path: '/',
    };
    const { getByTestId } = renderWithRouter(routerObject);

    const titleElement = getByTestId('item-title');
    expect(titleElement).toHaveTextContent(
      new RegExp(mockOneProduct.title, 'i')
    );

    const descriptionElement = getByTestId('item-description');
    const shortDescription = mockOneProduct.description.slice(
      0,
      DESCRIPTION_LENGTH
    );
    expect(descriptionElement).toHaveTextContent(
      new RegExp(shortDescription, 'i')
    );
  });

  it('Validate that clicking on a card opens a detailed card component', async () => {
    const routerObject: RouteObject = {
      element: <ProductCard product={mockOneProduct} />,
      path: '/',
    };
    const { getByRole } = renderWithRouter(routerObject, '/', routes);

    const linkElement = getByRole('link');
    await userEvent.click(linkElement);
    const detailsElement = await screen.findByTestId('product-details');
    expect(detailsElement).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const mockResponse = new Response(JSON.stringify(mockOneProduct), {
      status: 200,
    });

    const fetchMock = vi.fn(() => Promise.resolve(mockResponse));
    global.fetch = fetchMock;

    const routerObject: RouteObject = {
      element: <ProductCard product={mockOneProduct} />,
      path: '/',
    };
    const { getByRole } = renderWithRouter(routerObject, '/', routes);

    const linkElement = getByRole('link');
    await userEvent.click(linkElement);
    expect(fetchMock).toHaveBeenCalled();
  });
});
