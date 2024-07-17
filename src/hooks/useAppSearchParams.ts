import { useSearchParams } from 'react-router-dom';
import { SEARCH_PARAMETERS } from '../services/api';

export function useAppSearchParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get(SEARCH_PARAMETERS.page)) || 1;
  const query = searchParams.get(SEARCH_PARAMETERS.query) || '';

  function goToPage(pageNumber: number) {
    setSearchParams((params) => {
      params.set(SEARCH_PARAMETERS.page, pageNumber.toString());
      return params;
    });
  }

  function handleNewSearch(newQuery: string) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set(SEARCH_PARAMETERS.page, '1');
    urlSearchParams.set(SEARCH_PARAMETERS.query, newQuery);
    setSearchParams(urlSearchParams);
  }

  return { page, query, goToPage, handleNewSearch };
}
