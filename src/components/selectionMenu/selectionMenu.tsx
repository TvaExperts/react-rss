import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { productsSlice } from '../../store/slices/products.slice';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import styles from './selectionMenu.module.css';

export function SelectionMenu() {
  const dispatch = useDispatch();

  const { query } = useAppSearchParams();

  const selectedProductsRecord = useAppSelector(
    productsSlice.selectors.selectSelectedProducts
  );

  const selectedProducts = Object.values(selectedProductsRecord).filter(
    (v) => v !== undefined
  );

  if (selectedProducts.length === 0) {
    return null;
  }

  function createExportingData() {
    const header = `id;title;description;image path`;
    const data = Object.values(selectedProducts)
      .filter((p) => !!p)
      .map((product) => {
        return `${product.id};${product?.title};${product?.description};${product?.images}`;
      })
      .join('\n');
    return `${header}\n${data}`;
  }

  function handleDownloadList() {
    const filename = `${query.trim() ? `Products with query ${query.trim()}` : 'All products'}, ${selectedProducts.length} item${selectedProducts.length > 1 ? 's' : ''}`;
    const data = createExportingData();
    const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.click();
    URL.revokeObjectURL(url);
  }

  function unselectAllItems() {
    dispatch(productsSlice.actions.unselectAllProducts());
  }

  return (
    <div className={styles.selectionMenu}>
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
