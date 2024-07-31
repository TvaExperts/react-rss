import React from 'react';

import { ProductsApiResponse } from '@/services/api';
import { Product } from '@/models/product';
import { ProductCard } from '@/components/productCard/productCard';
import { Pagination } from '@/components/pagination/pagination';
import { Flyout } from '@/components/flyout/Flyout';
import styles from './productList.module.css';

import { TEXTS } from '../../../public/texts';

export function ProductList({
  productsApiResponse,
}: {
  productsApiResponse: ProductsApiResponse;
}) {
  const { products, total } = productsApiResponse;

  if (total === 0) {
    return <div className={styles.productListBlock}>{TEXTS.NOT_FOUND}</div>;
  }

  return (
    <div className={styles.productList}>
      <Pagination total={total} />
      <ul>
        {products.map((product: Product) => {
          return <ProductCard product={product} key={product.id} />;
        })}
      </ul>
      <Flyout />
    </div>
  );
}
