import { screen } from '@testing-library/dom';
import { userEvent } from '@testing-library/user-event';
import { vi } from 'vitest';
import { DESCRIPTION_LENGTH } from './productCard';
import { routes } from '../../router/router';
import * as api from '../../services/api';
import { renderWithRouterReduxContext } from '../../tests/helpers/renderWithRouterReduxContext';
import { mockArrOf30Products } from '../../tests/mocks/mockArrOf30Products';

describe('Tests for the Card component', () => {
  it('Should renders product title and short description', async () => {
    const { findAllByTestId } = renderWithRouterReduxContext(null, {
      routes,
    });

    const titleElement = (await findAllByTestId('item-title'))[0];
    expect(titleElement).toHaveTextContent(
      new RegExp(mockArrOf30Products[0].title, 'i')
    );

    const descriptionElement = (await findAllByTestId('item-description'))[0];
    const shortDescription = mockArrOf30Products[0].description.slice(
      0,
      DESCRIPTION_LENGTH
    );
    expect(descriptionElement).toHaveTextContent(
      new RegExp(shortDescription, 'i')
    );
  });

  it('Should opens a detailed card component when click title', async () => {
    const { findAllByRole, queryByTestId } = renderWithRouterReduxContext(
      null,
      {
        routes,
      }
    );

    const titleLinkElement = (await findAllByRole('link'))[0];

    let detailsPage = queryByTestId('product-details');
    expect(detailsPage).not.toBeInTheDocument();

    await userEvent.click(titleLinkElement);

    detailsPage = await screen.findByTestId('product-details');
    expect(detailsPage).toBeInTheDocument();
  });

  it('Check that clicking triggers an additional API call to fetch detailed information', async () => {
    const fetchFn = vi.spyOn(api, 'useGetProductByIdQuery');

    const { findAllByRole } = renderWithRouterReduxContext(null, {
      routes,
    });

    const titleLinkElement = (await findAllByRole('link'))[0];
    await userEvent.click(titleLinkElement);

    await screen.findByTestId('product-details');
    expect(fetchFn).toHaveBeenCalled();
  });
});
