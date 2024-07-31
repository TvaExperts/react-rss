import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTheme } from '@/context/themeContext';
import { useRouter } from 'next/router';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '@/utils/searchParams';
import { ROUTES } from '@/routes/routes';
import { selectedProductsSlice } from '@/store/slices/selectedProducts.slice';
import styles from './header.module.css';

import { TEXTS } from '../../../public/texts';

export function Header() {
  const dispatch = useDispatch();
  const { toggleTheme } = useTheme();

  const router = useRouter();
  const { page, query } = getAppSearchParamsFromQuery(router.query);

  const [inputQueryValue, setInputQueryValue] = useState<string>(query);

  function handleClickSearch() {
    const trimmedValue = inputQueryValue.trim();
    if (trimmedValue !== query) {
      dispatch(selectedProductsSlice.actions.unselectAllProducts());

      const newSearchParams = createSearchParams({
        query: trimmedValue,
        page: 1,
      });

      router.push(`${ROUTES.home}?${newSearchParams}`);
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
        data-testid="search-button"
      >
        {TEXTS.BUTTON_FIND}
      </button>
      <button type="button" onClick={toggleTheme}>
        THEME
      </button>
    </header>
  );
}
