import React, { useRef } from 'react';

import {
  Await,
  useLoaderData,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import styles from './productDetails.module.css';

import { TEXTS } from '../../texts';
import { ROUTES } from '../../router/routes';
import { Product } from '../../models/product';

type LoaderData = {
  productResponsePromise: Promise<Product>;
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
      <article className={styles.productDetails} data-testid="product-details">
        <React.Suspense
          fallback={<p data-testid="details-loading">{TEXTS.LOADING}</p>}
        >
          <Await
            resolve={productResponsePromise}
            errorElement={<p>{TEXTS.ERROR_TEXT}</p>}
          >
            {(productApiResponse: Product) => {
              // console.log(productApiResponse);
              const { title, description, images } = productApiResponse;
              return (
                <>
                  <h2 data-testid="product-title">{title}</h2>
                  <p data-testid="product-description">{description}</p>
                  <img src={images[0]} alt={title} />
                  <br />
                  <button
                    type="button"
                    onClick={handleCloseDetails}
                    data-testid="details-close"
                  >
                    Close
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
