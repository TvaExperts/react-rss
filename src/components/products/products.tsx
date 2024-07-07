import React from 'react';
import { ProductCard } from '../productCard/productCard';
import { Product } from '../../models/product';
import { TEXTS } from '../../texts';

type MainProps = {
  data: Product[];
  isLoading: boolean;
};

export class Products extends React.Component<MainProps> {
  render() {
    const { data, isLoading } = this.props;
    if (isLoading) {
      return <main>{TEXTS.MAIN_LOADING}</main>;
    }
    return (
      <main>
        {data.length ? (
          data.map((product) => {
            return <ProductCard product={product} key={product.id} />;
          })
        ) : (
          <p>{TEXTS.NOT_FOUND}</p>
        )}
      </main>
    );
  }
}
