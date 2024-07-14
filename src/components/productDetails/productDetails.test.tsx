import { screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { routes } from '../../router/router';
import { ROUTES } from '../../router/routes';
import { mockOneProduct } from '../../tests/mocks/mockOneProduct';

describe('Tests for the Detailed Card component', () => {
  it('Should renders with loader status when open details page', async () => {
    renderWithRouter(null, `/`, routes);

    const links = await screen.findAllByRole('link');
    await userEvent.click(links[0]);

    const loadingElement = await screen.findByTestId('details-loading');
    expect(loadingElement).toBeInTheDocument();
  });

  it('Make sure the detailed card component correctly displays the detailed card data', async () => {
    const { findByTestId } = renderWithRouter(
      null,
      `${ROUTES.PRODUCT}/${mockOneProduct.id}`,
      routes
    );

    const title = await findByTestId('product-title');
    const description = await findByTestId('product-description');

    expect(title.textContent).toBe(mockOneProduct.title);
    expect(description.textContent).toBe(mockOneProduct.description);
  });

  it('Should close page when click button close ', async () => {
    renderWithRouter(null, `${ROUTES.PRODUCT}/${mockOneProduct.id}`, routes);

    const closeButton = await screen.findByTestId('details-close');

    expect(closeButton).toBeInTheDocument();

    expect(screen.queryByTestId('product-details')).toBeInTheDocument();

    await userEvent.click(closeButton);

    expect(screen.queryByTestId('product-details')).not.toBeInTheDocument();
  });
});
