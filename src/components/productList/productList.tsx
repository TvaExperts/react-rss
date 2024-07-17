import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProductCard } from '../productCard/productCard';

import { TEXTS } from '../../../public/texts';
import { useGetProductsByParamsQuery } from '../../services/api';
import { productsActions } from '../../reducers/productsSlice';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';

export function ProductList() {
  const dispatch = useDispatch();

  const { page, query } = useAppSearchParams();

  const { data: productsData, isFetching } = useGetProductsByParamsQuery({
    page,
    query,
  });

  useEffect(() => {
    dispatch(productsActions.setProductsData(productsData));
  }, [dispatch, productsData]);

  if (isFetching) {
    return <p>{TEXTS.MAIN_LOADING}</p>;
  }

  if (!productsData || productsData.products.length === 0) {
    return <p>{TEXTS.NOT_FOUND}</p>;
  }

  return (
    <ul>
      {productsData.products.map((product) => {
        return <ProductCard product={product} key={product.id} />;
      })}
    </ul>
  );
}
