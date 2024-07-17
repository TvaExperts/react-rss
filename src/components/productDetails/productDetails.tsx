import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { useGetProductByIdQuery } from '../../services/api';
import { productActions } from '../../reducers/productSlice';
import styles from './productDetails.module.css';
import { ROUTES } from '../../router/routes';
import { TEXTS } from '../../../public/texts';

export function ProductDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const { productId } = useParams();

  const {
    data: product,
    isFetching,
    isError,
  } = useGetProductByIdQuery(productId || '1');

  useEffect(() => {
    dispatch(productActions.setProduct(product));
  }, [dispatch, product]);

  const overlayRef = useRef<HTMLDivElement>(null);

  function handleCloseDetails() {
    navigate(`${ROUTES.HOME}?${searchParams.toString()}`);
  }

  function handleClickOverlay(eventTarget: EventTarget) {
    console.log('dsf');
    if (eventTarget === overlayRef.current) handleCloseDetails();
  }

  if (isFetching) {
    return <p data-testid="details-loading">{TEXTS.LOADING}</p>;
  }

  if (isError || !product) {
    return <p>{TEXTS.ERROR_TEXT}</p>;
  }

  const { title, description, images } = product;

  return (
    <div
      className={styles.overlay}
      onClick={(event) => handleClickOverlay(event.target)}
      ref={overlayRef}
      role="presentation"
    >
      <section className={styles.productDetails}>
        <h2 data-testid="product-title">{title}</h2>
        <p data-testid="product-description">{description}</p>
        <img src={images[0]} alt={title} className={styles.productImage} />
        <br />
        <button
          type="button"
          onClick={handleCloseDetails}
          data-testid="details-close"
        >
          Close
        </button>
      </section>
    </div>
  );
}
