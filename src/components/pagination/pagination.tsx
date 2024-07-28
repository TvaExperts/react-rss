import { useSelector } from 'react-redux';
import { PRODUCTS_PER_PAGE } from '../../services/api';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';

import styles from './pagination.module.css';
import { productsSlice } from '../../store/slices/products.slice';

export function Pagination() {
  const totalProducts = useSelector(
    productsSlice.selectors.selectTotalProducts
  );
  const { page, goToPage } = useAppSearchParams();

  const highestPageNumber = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  function handleGoToPage(pageNumber: number) {
    goToPage(pageNumber);
  }

  if (totalProducts === 0) return null;

  return (
    <>
      <div className={styles.pagination}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(1)}
          disabled={page === 1}
        >
          &#60;&#60;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(page - 1)}
          disabled={page === 1}
        >
          &#60;
        </button>
        <p>{page}</p>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(page + 1)}
          disabled={page === highestPageNumber}
        >
          &#62;
        </button>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={() => handleGoToPage(highestPageNumber)}
          disabled={page === highestPageNumber}
        >
          &#62;&#62;
        </button>
      </div>
      <div className={styles.summary}>{`${totalProducts} product${
        totalProducts > 1 ? 's' : ''
      } found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}
