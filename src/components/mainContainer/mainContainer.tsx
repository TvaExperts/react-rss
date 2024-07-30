import React from 'react';
import { ProductsApiResponse } from '@/services/api';
import { Header } from '../header/header';

type MainContainerProps = {
  productsApiResponse: ProductsApiResponse;
  children?: React.ReactNode;
};

function MainContainer({ children, productsApiResponse }: MainContainerProps) {
  console.log(productsApiResponse);
  return (
    <>
      <Header />
      <main>
        {/* <ProductList productsApiResponse={productsApiResponse} /> */}
        {children}
      </main>
    </>
  );
}

MainContainer.defaultProps = {
  children: null,
};
export default MainContainer;
