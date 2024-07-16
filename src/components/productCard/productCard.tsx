import React from 'react';

import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './productCard.module.css';
import { Product } from '../../models/product';
import { ROUTES } from '../../router/routes';
import { useAppSelector } from '../../hooks/redux';
import { productsActions } from '../../reducers/productsSlice';

function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

export const DESCRIPTION_LENGTH = 50;

export function ProductCard({ product }: { product: Product }) {
  const { id, description } = product;

  const dispatch = useDispatch();
  const { selectedProductsId } = useAppSelector(
    (state) => state.productsReducer
  );

  const isSelected =
    selectedProductsId.find((value) => value === id) !== undefined;

  const shortDescription =
    description && stripHTMLTags(description).slice(0, DESCRIPTION_LENGTH);

  const [queryParams] = useSearchParams();

  function toggleSelection() {
    if (isSelected) {
      dispatch(productsActions.unselectProduct(id));
    } else {
      dispatch(productsActions.selectProduct(id));
    }
  }

  return (
    <li className={styles.block}>
      <input
        type="checkbox"
        defaultChecked={isSelected}
        onClick={toggleSelection}
      />
      <Link to={`${ROUTES.PRODUCT}/${product.id}?${queryParams.toString()}`}>
        <span className={styles.title} data-testid="item-title">
          {product.title}
        </span>
      </Link>
      {shortDescription ? (
        <span data-testid="item-description"> {shortDescription}...</span>
      ) : (
        ''
      )}
    </li>
  );
}
