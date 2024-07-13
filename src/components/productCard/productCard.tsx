import React from 'react';

import styles from './productCard.module.css';
import { Product } from '../../models/product';

type CardProps = {
  product: Product;
};

function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}

export class ProductCard extends React.Component<CardProps> {
  render() {
    const { product } = this.props;

    const shortDescription =
      product.description && stripHTMLTags(product.description).slice(0, 50);
    return (
      <div className={styles.block}>
        <span className={styles.title}>{product.title} </span>
        {shortDescription ? <span> {shortDescription}...</span> : ''}
      </div>
    );
  }
}
