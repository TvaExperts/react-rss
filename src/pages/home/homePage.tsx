import React from 'react';

import { Outlet } from 'react-router-dom';
import styles from './homePage.module.css';
import { Header } from '../../components/header/header';
import { ProductList } from '../../components/productList/productList';
import { Pagination } from '../../components/pagination/pagination';

export function HomePage() {
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div>
          <Pagination />
          <ProductList />
        </div>
        <Outlet />
      </main>
    </>
  );
}
