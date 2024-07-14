import React, { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './header.module.css';

import { Product } from '../../models/product';
import { getProducts, SEARCH_PARAMETERS } from '../../services/api';
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

  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get(SEARCH_PARAMETERS.page));

  const handleClickFind = useCallback(async () => {
    setIsLoading(true);
    setQueryInLS(query);
    const { products, total } = await getProducts({ query, page });
    setTotalProducts(total);
    setProducts(products);
    setIsLoading(false);
  }, [query, page]);

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
      />
      <button type="button" onClick={handleClickFind} disabled={isLoading}>
        {isLoading ? TEXTS.LOADING : TEXTS.BUTTON_FIND}
      </button>
    </header>
  );
}
