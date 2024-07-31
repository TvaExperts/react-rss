import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '@/utils/searchParams';
import { ROUTES } from '@/routes/routes';
import { Product } from '@/models/product';
import { useDispatch, useSelector } from 'react-redux';
import { productsSlice } from '@/store/slices/products.slice';
import styles from './productCard.module.css';

export const DESCRIPTION_LENGTH = 50;

export function ProductCard({ product }: { product: Product }) {
  const shortDescription = `${product.description.slice(
    0,
    DESCRIPTION_LENGTH
  )}...`;
  const router = useRouter();
  const appSearchParams = getAppSearchParamsFromQuery(router.query);

  const { id, description } = product;

  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    productsSlice.selectors.selectSelectedProducts
  );

  const isSelectedCard = !!selectedProducts[id];

  function toggleSelection() {
    if (isSelectedCard) {
      dispatch(productsSlice.actions.unselectProduct(id));
    } else {
      dispatch(productsSlice.actions.selectProduct(product));
    }
  }

  return (
    <li className={styles.block}>
      <input
        type="checkbox"
        checked={isSelectedCard}
        onChange={toggleSelection}
      />
      <Link
        href={`${ROUTES.product}/${product.id}?${createSearchParams(appSearchParams)}`}
      >
        <span className={styles.title} data-testid="item-title">
          {product.title}
        </span>
      </Link>
      <span data-testid="item-description">
        {shortDescription || 'No description'}...
      </span>
    </li>
  );
}
