import { useState } from 'react';

import { Header } from '../header/header';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';
import { ProductList } from '../products/productList';

export function RootLayout() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <>
      <Header
        setProducts={setProducts}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />

      <main>
        {isLoading && TEXTS.LOADING}
        {!isLoading && products.length === 0 && TEXTS.NOT_FOUND}
        {!isLoading && products.length > 0 && (
          <ProductList products={products} isLoading={isLoading} />
        )}
      </main>
    </>
  );
}
