import '@testing-library/jest-dom';
import { expect, vi } from 'vitest';
import { Header } from '@/components/header/header';
import { renderWithReduxAndContext } from '@/__tests__/helpers/renderWithReduxAndContext';

const TEMP_TEXT = 'temp_text';

vi.mock('next/router', () => {
  return {
    useRouter: () => {
      return { query: { query: TEMP_TEXT }, push: vi.fn() };
    },
  };
});

describe('Tests for the Header component', () => {
  it('Verify that the Header renders with input, which contains the text from the url', () => {
    const { getByTestId } = renderWithReduxAndContext(<Header />);

    const input = getByTestId('search-input') as HTMLInputElement;
    expect(input.value).toBe(TEMP_TEXT);
  });
});
