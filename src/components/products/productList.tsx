import React from 'react';
import { ProductCard } from '../productCard/productCard';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';

type MainProps = {
  products: Product[];
  isLoading: boolean;
};

export class ProductList extends React.Component<MainProps> {
  render() {
    const { products, isLoading } = this.props;
    if (isLoading) {
      return <main>{TEXTS.MAIN_LOADING}</main>;
    }
    return (
      <main>
        {products.length ? (
          products.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        ) : (
          <p>{TEXTS.NOT_FOUND}</p>
        )}
      </main>
    );
  }
}
