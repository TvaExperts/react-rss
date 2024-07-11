import React, { useEffect, useState } from 'react';
import styles from './header.module.css';

import { Product } from '../../models/product';
import { getProductsFromApi } from '../../services/api';
import { TEXTS } from '../../texts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface HeaderProps {
  setProducts: (data: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: boolean;
}

export function Header({ setProducts, setIsLoading, isLoading }: HeaderProps) {
  const { setQueryInLS, getQueryFromLS } = useLocalStorage();

  const [query, setQuery] = useState(getQueryFromLS());
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error(TEXTS.ERROR_TEXT);

  async function handleClickFind() {
    setIsLoading(true);
    setQueryInLS(query);
    const { products } = await getProductsFromApi(query);
    setProducts(products);
    setIsLoading(false);
  }

  useEffect(() => {
    handleClickFind();
  }, []);

  return (
    <header className={styles.header}>
      <input
        type="text"
        className={styles.findInput}
        placeholder={TEXTS.INPUT_PLACEHOLDER}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button type="button" onClick={handleClickFind} disabled={isLoading}>
        {isLoading ? TEXTS.LOADING : TEXTS.BUTTON_FIND}
      </button>

      <button type="button" onClick={() => setHasError(true)}>
        {TEXTS.BUTTON_ERROR}
      </button>
    </header>
  );
}
