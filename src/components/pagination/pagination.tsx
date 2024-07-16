import { useSearchParams } from 'react-router-dom';
import styles from './pagination.module.css';
// import { PRODUCTS_PER_PAGE } from '../../services/api';
import { SEARCH_PARAMETERS } from '../../services/apiOld';
import { PRODUCTS_PER_PAGE } from '../../services/api';

type PaginationProps = {
  totalProducts: number;
};

export function Pagination({ totalProducts }: PaginationProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = 1; // Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1;

  const highestPageNumber = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  function handleGoToPage(pageNumber: number) {
    searchParams.set(SEARCH_PARAMETERS.page, pageNumber.toString());
    setSearchParams(searchParams);
  }

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
