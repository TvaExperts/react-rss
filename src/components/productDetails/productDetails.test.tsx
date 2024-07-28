import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { routes } from '../../router/router';
import { ROUTES } from '../../router/routes';
import { mockOneProduct } from '../../tests/mocks/mockOneProduct';
import { renderWithRouterReduxContext } from '../../tests/helpers/renderWithRouterReduxContext';

describe('Tests for the Detailed Card component', () => {
  it('Should renders with loader status when open details page', async () => {
    renderWithRouterReduxContext(null, {
      routes,
      path: `${ROUTES.PRODUCT}/${mockOneProduct.id}`,
    });

    const loadingElement = await screen.findByTestId('details-loading');
    expect(loadingElement).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByTestId } = renderWithRouterReduxContext(null, {
      routes,
      path: `${ROUTES.PRODUCT}/${mockOneProduct.id}`,
    });

    const title = await findByTestId('product-title');
    const description = await findByTestId('product-description');

    expect(title.textContent).toBe(mockOneProduct.title);
    expect(description.textContent).toBe(mockOneProduct.description);
  });

  it('Should close page when click button close ', async () => {
    const { findByTestId } = renderWithRouterReduxContext(null, {
      routes,
      path: `${ROUTES.PRODUCT}/${mockOneProduct.id}`,
    });

    const productTitle = await findByTestId('product-title');
    expect(productTitle).toBeInTheDocument();
    const closeButton = await findByTestId('details-close');

    await userEvent.click(closeButton);

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });
});
