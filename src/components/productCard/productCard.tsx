import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '@/utils/searchParams';
import { ROUTES } from '@/routes/routes';
import { Product } from '@/models/product';
import { useDispatch, useSelector } from 'react-redux';
import { selectedProductsSlice } from '@/store/slices/selectedProducts.slice';
import styles from './productCard.module.css';

export const DESCRIPTION_LENGTH = 50;

export function ProductCard({ product }: { product: Product }) {
  const router = useRouter();
  const appSearchParams = getAppSearchParamsFromQuery(router.query);

  const dispatch = useDispatch();
  const selectedProducts = useSelector(
    selectedProductsSlice.selectors.selectSelectedProducts
  );

  const { id, description } = product;

  const isSelectedCard = !!selectedProducts[id];

  function toggleSelection() {
    if (isSelectedCard) {
      dispatch(selectedProductsSlice.actions.unselectProduct(id));
    } else {
      dispatch(selectedProductsSlice.actions.selectProduct(product));
    }
  }

  const shortDescription = description
    ? `${description.slice(0, DESCRIPTION_LENGTH)}...`
    : 'No description';

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
      <span data-testid="item-description">{shortDescription}</span>
    </li>
  );
}
