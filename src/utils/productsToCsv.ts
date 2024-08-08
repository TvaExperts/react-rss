import { Product } from '@/models/product';

const CSV_SEPARATOR = ';';

export function convertProductsToCsvData(products: Product[]) {
  const header = ['id', 'title', 'description', 'image path'].join(
    CSV_SEPARATOR
  );
  const dataLines = products
    .map((product) => {
      return [
        product.id,
        product?.title,
        product?.description,
        product?.images,
      ].join(CSV_SEPARATOR);
    })
    .join('\n');
  return `${header}\n${dataLines}`;
}
