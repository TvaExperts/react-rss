import { useDispatch, useSelector } from 'react-redux';
import { getAppSearchParamsFromQuery } from '@/utils/searchParams';
import { useRouter } from 'next/router';
import { selectedProductsSlice } from '@/store/slices/selectedProducts.slice';
import { convertProductsToCsvData } from '@/utils/productsToCsv';
import { exportCsvFile } from '@/utils/exportCsvFile';
import styles from './flyout.module.css';

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
    const filename = `${query.trim() ? `Products with query ${query.trim()}` : 'All products'}, ${selectedProducts.length} item${selectedProducts.length > 1 ? 's' : ''}`;
    const data = convertProductsToCsvData(selectedProducts);
    exportCsvFile(filename, data);
  }

  function unselectAllItems() {
    dispatch(selectedProductsSlice.actions.unselectAllProducts());
  }

  return (
    <div className={styles.flyout}>
      <button onClick={unselectAllItems} type="button">
        Unselect all
      </button>
      <p>{`Selected: ${selectedProducts.length} item${selectedProducts.length > 1 ? 's' : ''}`}</p>
      <button onClick={handleDownloadList} type="button">
        Download
      </button>
    </div>
  );
}
