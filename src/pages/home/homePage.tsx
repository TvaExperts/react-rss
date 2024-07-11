import React, { useState } from 'react';

import { Outlet } from 'react-router-dom';
import styles from './homePage.module.css';
import { Header } from '../../components/header/header';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';
import { ProductList } from '../../components/productList/productList';
import { Pagination } from '../../components/pagination/pagination';

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalProducts, setTotalProducts] = useState(0);

  return (
    <>
      <Header
        setProducts={setProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setTotalProducts={setTotalProducts}
      />

      <main className={styles.main}>
        {isLoading && TEXTS.LOADING}
        {!isLoading && products.length === 0 && TEXTS.NOT_FOUND}
        {!isLoading && products.length > 0 && (
          <div>
            <div>
              <Pagination totalProducts={totalProducts} />
              <ProductList products={products} isLoading={isLoading} />
            </div>
            <Outlet />
          </div>
        )}
      </main>
    </>
  );
}
