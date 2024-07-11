import React, { useRef } from 'react';

import {
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styles from './productDetails.module.css';

import { ProductApiResponse } from '../../services/api';
import { TEXTS } from '../../texts';
import { ROUTES } from '../../router/routes';

type LoaderData = {
  productResponsePromise: Promise<ProductApiResponse>;
};

export function ProductDetails() {
  const { productResponsePromise } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseDetails() {
    navigate(`${ROUTES.HOME}?${searchParams.toString()}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    if (eventTarget === overlayRef.current) handleCloseDetails();
  }

  return (
    <div
      className={styles.overlay}
      onClick={(e) => handleClickOverlay(e.target)}
      ref={overlayRef}
      role="presentation"
    >
      <article className={styles.productDetails}>
        <React.Suspense fallback={<p>{TEXTS.LOADING}</p>}>
          <Await
            resolve={productResponsePromise}
            errorElement={<p>{TEXTS.ERROR_TEXT}</p>}
          >
            {(productApiResponse: ProductApiResponse) => {
              const { title, description, images } = productApiResponse.data;
              return (
                <>
                  <h2>{title}</h2>
                  <p>{description}</p>
                  <img src={images[0]} alt={title} />
                  <br />
                  <button type="button" onClick={handleCloseDetails}>
                    {TEXTS.LOADING}
                  </button>
                </>
              );
            }}
          </Await>
        </React.Suspense>
      </article>
    </div>
  );
}
