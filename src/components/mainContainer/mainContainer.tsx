import React from 'react';
import { ProductsApiResponse } from '@/services/api';
import { ProductList } from '@/components/productList/productList';
import { Header } from '../header/header';

type MainContainerProps = {
  productsApiResponse: ProductsApiResponse;
  children?: React.ReactNode;
};

export function MainContainer({
  children,
  productsApiResponse,
}: MainContainerProps) {
  console.log(productsApiResponse);
  return (
    <>
      <Header />
      <main>
        <ProductList productsApiResponse={productsApiResponse} />
        {children}
      </main>
    </>
  );
}
