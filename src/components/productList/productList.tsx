import React from 'react';
import { ProductCard } from '../productCard/productCard';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';

type ProductListProps = {
  products: Product[];
  isLoading: boolean;
};

export function ProductList({ products, isLoading }: ProductListProps) {
  if (isLoading) {
    return <p>{TEXTS.MAIN_LOADING}</p>;
  }

  if (products.length === 0) {
    return <p>{TEXTS.NOT_FOUND}</p>;
  }

  return (
    <ul>
      {products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </ul>
  );
}
