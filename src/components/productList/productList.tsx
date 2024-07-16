import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../productCard/productCard';

import { TEXTS } from '../../texts';
import { useAppSelector } from '../../hooks/redux';
import { useGetProductsByParamsQuery } from '../../services/api';
import { productsActions } from '../../reducers/productsSlice';

export function ProductList() {
  const dispatch = useDispatch();
  const { products, isLoading } = useAppSelector(
    (state) => state.productsReducer
  );

  const { data: productsData } = useGetProductsByParamsQuery({
    page: 1,
    query: '',
  });

  useEffect(() => {
    dispatch(productsActions.setProductsData(productsData || null));
  }, [dispatch, productsData]);

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
