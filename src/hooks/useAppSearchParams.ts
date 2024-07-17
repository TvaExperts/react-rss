import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAMETERS } from '../services/api';

export function useAppSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1;
  const query = searchParams.get(SEARCH_PARAMETERS.query) || '';

  function goToPage(pageNumber: number) {
    setSearchParams((prevParams) => {
      prevParams.set(SEARCH_PARAMETERS.page, pageNumber.toString());
      return prevParams;
    });
  }

  return { page, query, goToPage };
}
