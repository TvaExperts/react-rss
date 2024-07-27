import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../store/store';
import { productsSlice } from '../../store/slices/products.slice';
import { useAppSearchParams } from '../../hooks/useAppSearchParams';
import styles from './selectionMenu.module.css';

export function SelectionMenu() {
  const dispatch = useDispatch();

  const { query } = useAppSearchParams();

  const selectedItems = useAppSelector(
    productsSlice.selectors.selectSelectedProducts
  );

  const selectedItemsQuantity = Object.values(selectedItems).filter(
    (v) => v !== undefined
  ).length;

  if (selectedItemsQuantity === 0) {
    return null;
  }

  function handleDownloadList() {
    const fileName = `${query.trim() ? `Products with query ${query.trim()}` : 'All products'}, ${selectedItemsQuantity} item ${selectedItemsQuantity !== 1 ? 's' : ''}`;
    console.log(fileName);
  }

  function unselectAllItems() {
    dispatch(productsSlice.actions.unselectAllProducts());
  }

  return (
    <div className={styles.selectionMenu}>
      <p>{`Selected: ${selectedItemsQuantity} items`}</p>
      <button onClick={unselectAllItems} type="button">
        Unselect all
      </button>
      <button onClick={handleDownloadList} type="button">
        Download
      </button>
    </div>
  );
}
