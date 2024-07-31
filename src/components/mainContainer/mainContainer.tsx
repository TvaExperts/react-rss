import React from 'react';
import { ProductsApiResponse } from '@/services/api';
import { ProductList } from '@/components/productList/productList';
import { Header } from '@/components/header/header';

type MainContainerProps = {
  productsApiResponse: ProductsApiResponse;
  children?: React.ReactNode;
};

export function MainContainer({
  children,
  productsApiResponse,
}: MainContainerProps) {
  return (
    <div>
      <Header />
      <main>
        <ProductList productsApiResponse={productsApiResponse} />
        {children}
      </main>
    </div>
  );
}
