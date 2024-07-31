import { ParsedUrlQuery } from 'querystring';
import { AppSearchParams, SEARCH_PARAMETERS } from '@/models/searchParams';

function isEmptySearchParams(parsedUrlQuery: ParsedUrlQuery) {
  const { page, query } = parsedUrlQuery;
  return !(page && query !== undefined);
}

function createSearchParams(appSearchParams: AppSearchParams) {
  const searchParams = new URLSearchParams();
  searchParams.set(SEARCH_PARAMETERS.query, appSearchParams.query);
  searchParams.set(SEARCH_PARAMETERS.page, appSearchParams.page.toString());
  return searchParams;
}

function getAppSearchParamsFromQuery(parsedUrlQuery: ParsedUrlQuery) {
  const { page, query } = parsedUrlQuery;

  const appSearchParams: AppSearchParams = {
    page: page ? Number(page.toString()) : 1,
    query: query ? query.toString() : '',
  };
  return appSearchParams;
}

export { createSearchParams, isEmptySearchParams, getAppSearchParamsFromQuery };
