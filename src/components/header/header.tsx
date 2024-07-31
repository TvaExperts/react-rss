import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '@/context/themeContext';
import { productsSlice } from '@/store/slices/products.slice';
import { useRouter } from 'next/router';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '@/utils/searchParams';
import { ROUTES } from '@/routes/routes';
import styles from './header.module.css';

import { TEXTS } from '../../../public/texts';

export function Header() {
  const dispatch = useDispatch();
  const { toggleTheme, theme } = useTheme();

  const isLoading = useSelector(productsSlice.selectors.selectIsLoading);

  const router = useRouter();
  const { page, query } = getAppSearchParamsFromQuery(router.query);

  const [inputQueryValue, setInputQueryValue] = useState<string>(query);

  function handleClickSearch() {
    const trimmedValue = inputQueryValue.trim();
    if (trimmedValue !== query) {
      dispatch(productsSlice.actions.unselectAllProducts());

      const newSearchParams = createSearchParams({
        query: trimmedValue,
        page,
      });

      router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
    }
  }

  return (
    <header className={styles.header}>
      <input
        type="text"
        className={styles.findInput}
        placeholder={TEXTS.INPUT_PLACEHOLDER}
        value={inputQueryValue}
        onChange={(event) => setInputQueryValue(event.target.value)}
        data-testid="search-input"
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleClickSearch}
        disabled={isLoading}
        data-testid="search-button"
      >
        {isLoading ? TEXTS.LOADING : TEXTS.BUTTON_FIND}
      </button>
      <button type="button" onClick={toggleTheme}>
        THEME
      </button>
    </header>
  );
}
