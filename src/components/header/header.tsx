import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

import { TEXTS } from '../../texts';
import { useAppSelector } from '../../hooks/redux';
import { ROUTES } from '../../router/routes';
import { SEARCH_PARAMETERS } from '../../services/api';

export function Header() {
  const { query, isLoading } = useAppSelector((store) => store.productsReducer);
  console.log(query);
  const [inputQueryValue, setInputQueryValue] = useState<string>(query);
  const navigate = useNavigate();

  function handleClickSearch() {
    const trimmedValue = inputQueryValue.trim();

    if (trimmedValue !== query) {
      const searchParams = new URLSearchParams();
      searchParams.set(SEARCH_PARAMETERS.page, '1');
      searchParams.set(SEARCH_PARAMETERS.query, trimmedValue);
      navigate(`${ROUTES.HOME}?${searchParams.toString()}`);
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
