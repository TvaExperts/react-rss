import { PRODUCTS_PER_PAGE } from '../../services/api';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import { useAppSelector } from '../../hooks/redux';

import styles from './pagination.module.css';

export function Pagination() {
  const { total } = useAppSelector((store) => store.productsReducer);
  const { page, goToPage } = useAppSearchParams();

  const highestPageNumber = Math.ceil(total / PRODUCTS_PER_PAGE);

  function handleGoToPage(pageNumber: number) {
    goToPage(pageNumber);
  }

  if (total === 0) return null;

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
      <div className={styles.summary}>{`${total} product${
        total > 1 ? 's' : ''
      } found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}
