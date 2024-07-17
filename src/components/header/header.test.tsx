import { userEvent } from '@testing-library/user-event';
import { renderWithRouter } from '../../tests/helpers/renderWithRouter';
import { routes } from '../../router/router';

const KEY_IN_LS = 'test';

describe('Header tests', () => {
  it('Verify that clicking the Search button saves the entered value to the local storage', async () => {
    const { getByTestId } = renderWithRouter(null, `/`, routes);

    localStorage.removeItem(KEY_IN_LS);

    const searchInput = getByTestId('search-input');
    const searchButton = getByTestId('search-button');

    const testStr = Date.now().toString();

    await userEvent.type(searchInput, testStr);
    await userEvent.click(searchButton);
    const dataInLS = localStorage.getItem(KEY_IN_LS);

    expect(dataInLS).toBe(testStr);
  });

  it('Check that the component retrieves the value from the local storage upon mounting', async () => {
    const testStr = Date.now().toString();
    localStorage.setItem(KEY_IN_LS, testStr);
    const { getByTestId } = renderWithRouter(null, `/`, routes);
    const searchInput = getByTestId('search-input') as HTMLInputElement;
    expect(searchInput.value).toBe(testStr);
  });
});
