import { pluralS } from '@/utils/pluralS';

enum TEXTS {
  INPUT_PLACEHOLDER = 'Search products...',
  BUTTON_FIND = 'Search',
  UNSELECT_ALL = 'Unselect all',
  DOWNLOAD = 'Download',
  BUTTON_THEME = 'THEME',
  NOT_FOUND = 'Nothing was found, make another request',
  BUTTON_CLOSE = 'Close',
}

export function getPaginationDescription(items: number, pages: number) {
  return `${items} product${pluralS(
    items
  )} found. Presented on ${pages} page${pluralS(pages)}`;
}

export function getFlyoutDescription(itemsSelected: number) {
  return `Selected: ${itemsSelected} item${pluralS(itemsSelected)}`;
}

export function getFilenameForExport(query: string, items: number) {
  return `${query.trim() ? `Products with query ${query.trim()}` : 'All products'}, ${items} item${pluralS(items)}`;
}

export { TEXTS };
