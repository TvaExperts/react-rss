import { useDispatch, useSelector } from 'react-redux';
import { getAppSearchParamsFromQuery } from '@/utils/searchParams';
import { useRouter } from 'next/router';
import { selectedProductsSlice } from '@/store/slices/selectedProducts.slice';
import { convertProductsToCsvData } from '@/utils/productsToCsv';
import { exportCsvFile } from '@/utils/exportCsvFile';
import styles from './flyout.module.css';
import {
  getFilenameForExport,
  getFlyoutDescription,
  TEXTS,
} from '../../../public/texts';

export function Flyout() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { query } = getAppSearchParamsFromQuery(router.query);

  const selectedProductsRecord = useSelector(
    selectedProductsSlice.selectors.selectSelectedProducts
  );

  const selectedProducts = Object.values(selectedProductsRecord).filter(
    (v) => v !== undefined
  );

  if (selectedProducts.length === 0) {
    return null;
  }

  function handleDownloadList() {
    const filename = getFilenameForExport(
      query.trim(),
      selectedProducts.length
    );
    const data = convertProductsToCsvData(selectedProducts);
    exportCsvFile(filename, data);
  }

  function unselectAllItems() {
    dispatch(selectedProductsSlice.actions.unselectAllProducts());
  }

  return (
    <div className={styles.flyout}>
      <button onClick={unselectAllItems} type="button">
        {TEXTS.UNSELECT_ALL}
      </button>
      <p>{getFlyoutDescription(selectedProducts.length)}</p>
      <button onClick={handleDownloadList} type="button">
        {TEXTS.DOWNLOAD}
      </button>
    </div>
  );
}
