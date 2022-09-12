import { createCards } from '../main/content/content';
import { Card } from '../types/types';
import {
  nameAZ,
  nameZA,
  yearAsc,
  yearDesc,
  volumeAsc,
  volumeDesc,
  sortField
} from '../types/sortConstantsAndTypes';
/** Сортировка */
const sortField: HTMLSelectElement | null = document.querySelector('.sort-field');
export const sorting = (sortData: Card[])=> {
  const sortBy = (sortedKey: sortField, param?: string) => sortData.sort((v1: Card, v2: Card) => {
    if (param) {
      [v1, v2] = [v2, v1];
    }
    if (sortedKey === 'year' || sortedKey === 'volume') {
      return +v1[sortedKey] - +v2[sortedKey];
    }
    // eslint-disable-next-line no-nested-ternary
    return v1[sortedKey] === v2[sortedKey] ? 0 : v1[sortedKey] > v2[sortedKey] ? 1 : -1;
  });

  switch (sortField?.value) {
    case nameAZ:
      sortBy('brand');
      break;
    case nameZA:
      sortBy('brand', 'desc');
      break;
    case yearAsc:
      sortBy('year');
      break;
    case yearDesc:
      sortBy('year', 'desc');
      break;
    case volumeAsc:
      sortBy('volume');
      break;
    case volumeDesc:
      sortBy('volume', 'desc');
      break;
    default:
      break;
  }
  createCards(sortData);
};
