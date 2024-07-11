import { useState } from 'react';

import { Header } from '../../components/header/header';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';
import { ProductList } from '../../components/productList/productList';

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

      <main>
        {isLoading && TEXTS.LOADING}
        {!isLoading && products.length === 0 && TEXTS.NOT_FOUND}
        {!isLoading && products.length > 0 && (
          <ProductList
            products={products}
            isLoading={isLoading}
            totalProducts={totalProducts}
          />
        )}
      </main>
    </>
  );
}
