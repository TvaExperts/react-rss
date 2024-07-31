import React from 'react';
import { useRouter } from 'next/router';
import {
  createSearchParams,
  getAppSearchParamsFromQuery,
} from '@/utils/searchParams';
import { ROUTES } from '@/routes/routes';
import { PRODUCTS_PER_PAGE } from '@/models/searchParams';
import styles from './paginatiom.module.css';

export function Pagination({ total }: { total: number }) {
  const router = useRouter();
  const { page, query } = getAppSearchParamsFromQuery(router.query);

  const highestPageNumber = Math.ceil(total / PRODUCTS_PER_PAGE);

  function handleGoToPage(pageNumber: number) {
    const newSearchParams = createSearchParams({
      query,
      page: pageNumber,
    });

    router.push(`${ROUTES.home}?${newSearchParams.toString()}`);
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
      <div className={styles.summary}>{`${total} product${
        total > 1 ? 's' : ''
      } found. Presented on ${highestPageNumber} page${
        highestPageNumber > 1 ? 's' : ''
      }`}</div>
    </>
  );
}
