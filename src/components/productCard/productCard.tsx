import React from 'react';

import { Link, useSearchParams } from 'react-router-dom';
import styles from './productCard.module.css';
import { Product } from '../../models/product';
import { ROUTES } from '../../router/routes';

function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

export function ProductCard({ product }: { product: Product }) {
  const shortDescription =
    product.description && stripHTMLTags(product.description).slice(0, 50);

  const [queryParams] = useSearchParams();

  return (
    <div className={styles.block}>
      <Link to={`${ROUTES.PRODUCT}/${product.id}?${queryParams.toString()}`}>
        <span className={styles.title}>{product.title} </span>
      </Link>
      {shortDescription ? <span> {shortDescription}...</span> : ''}
    </div>
  );
}
