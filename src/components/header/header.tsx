import React, { useCallback, useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import styles from './header.module.css';

import { Product } from '../../models/product';
import { TEXTS } from '../../texts';
import { useLocalStorage } from '../../hooks/useLocalStorage';

interface HeaderProps {
  setProducts: (data: Product[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setTotalProducts: (totalProducts: number) => void;
  isLoading: boolean;
}

export function Header({
  setProducts,
  setIsLoading,
  isLoading,
  setTotalProducts,
}: HeaderProps) {
  const { setQueryInLS, getQueryFromLS } = useLocalStorage();

  const [query, setQuery] = useState(getQueryFromLS());

  // const [searchParams] = useSearchParams();

  const page = 1; // Number(searchParams.get(SEARCH_PARAMETERS.page));

  const handleClickFind = useCallback(async () => {
    setIsLoading(true);
    setQueryInLS(query);
    // const { products, total } = await getProducts({ query, page });
    // setTotalProducts(total);
    // setProducts(products);
    // setIsLoading(false);
    console.log('setProducts');
  }, [setIsLoading, setQueryInLS, query, page, setTotalProducts, setProducts]);

  useEffect(() => {
    handleClickFind();
  }, [page]);

  return (
    <header className={styles.header}>
      <input
        type="text"
        className={styles.findInput}
        placeholder={TEXTS.INPUT_PLACEHOLDER}
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        data-testid="search-input"
      />
      <button
        type="button"
        className={styles.searchButton}
        onClick={handleClickFind}
        disabled={isLoading}
        data-testid="search-button"
      >
        {isLoading ? TEXTS.LOADING : TEXTS.BUTTON_FIND}
      </button>
    </header>
  );
}
