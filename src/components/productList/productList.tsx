import React from 'react';
import { ProductCard } from '../productCard/productCard';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';

type ProductListProps = {
  products: Product[];
  isLoading: boolean;
  totalProducts: number;
};

export function ProductList({
  products,
  isLoading,
  totalProducts,
}: ProductListProps) {
  if (isLoading) {
    return <main>{TEXTS.MAIN_LOADING}</main>;
  }

  return (
    <main>
      {products.length ? (
        products.map((product) => {
          return <ProductCard product={product} key={product.id} />;
        })
      ) : (
        <p>
          {TEXTS.NOT_FOUND}
          {totalProducts}
        </p>
      )}
    </main>
  );
}
