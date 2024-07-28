import React from 'react';

import { Outlet } from 'react-router-dom';
import styles from './homePage.module.css';
import { Header } from '../../components/header/header';
import { ProductList } from '../../components/productList/productList';
import { useTheme } from '../../context/themeContext';

export function HomePage() {
  const { theme } = useTheme();
  return (
    <>
      <Header />
      <main className={styles.main} data-theme={theme}>
        <ProductList />
        <Outlet />
      </main>
    </>
  );
}
