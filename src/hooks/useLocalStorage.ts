const KEY_IN_LS = 'rss-react-course';

export function useLocalStorage() {
  function setQueryInLS(value: string) {
    localStorage.setItem(KEY_IN_LS, value);
  }

  function getQueryFromLS() {
    return localStorage.getItem(KEY_IN_LS) || '';
  }

  return { setQueryInLS, getQueryFromLS };
}
