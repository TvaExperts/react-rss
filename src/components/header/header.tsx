import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './header.module.css';

import { TEXTS } from '../../../public/texts';

import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import { productsSlice } from '../../reducers/productsSlice';
import { useAppSelector } from '../../store';

export function Header() {
  const dispatch = useDispatch();

  const isLoading = useAppSelector(productsSlice.selectors.selectIsLoading);

  const { query, handleNewSearch } = useAppSearchParams();

  const [inputQueryValue, setInputQueryValue] = useState<string>(query);

  function handleClickSearch() {
    const trimmedValue = inputQueryValue.trim();
    if (trimmedValue !== query) {
      dispatch(productsSlice.actions.unselectAllProducts());
      handleNewSearch(trimmedValue);
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
    </header>
  );
}
