import './settings.scss';
import { createHTMLElement } from '../../types/createHTMLElement';

export const createSearch = () => {
  const searchForm = createHTMLElement('div', 'search-form');
  const searchTitle = createHTMLElement('h2', 'filter-title');
  searchTitle.textContent = 'Поиск';

  const searchField = createHTMLElement('input', 'search-form__search-field');
  if (searchField instanceof HTMLInputElement) {
    searchField.type = 'search';
    searchField.placeholder = 'Введите марку авто';
    searchField.autofocus = true;
    searchField.autocomplete = 'off';
  }
  searchForm.append(searchTitle, searchField);

  return searchForm;
};
