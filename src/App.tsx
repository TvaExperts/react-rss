import React from 'react';
import { Header } from './components/header/header';

import { Product } from './models/product';
import { Products } from './components/products/products';

type DataState = {
  items: Product[];
  isLoading: boolean;
};

export class App extends React.Component<object, DataState> {
  constructor(props: object) {
    super(props);
    this.state = { items: [], isLoading: false };
  }

  setIsLoading = (isLoading: boolean) => {
    this.setState(() => ({ isLoading }));
  };

  setDataItems = (data: Product[]) => {
    this.setState(() => ({ items: data }));
  };

  render() {
    const { items, isLoading } = this.state;
    return (
      <>
        <Header
          setItems={this.setDataItems}
          setIsLoading={this.setIsLoading}
          isLoading={isLoading}
        />
        <Products data={items} isLoading={isLoading} />
      </>
    );
  }
}
