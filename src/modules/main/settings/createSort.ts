import './settings.scss';
import { createHTMLElement } from '../../types/createHTMLElement';
import {
  all,
  nameAZ,
  nameZA,
  yearAsc,
  yearDesc,
  volumeAsc,
  volumeDesc
} from '../../types/sortConstantsAndTypes';

export const createSort = () => {
  const options: {value: string; label: string;}[] = [
    {
      value: all,
      label: 'Выберете значение'
    },
    {
      value: nameAZ,
      label: 'По марке, от А до Я'
    },
    {
      value: nameZA,
      label: 'По марке, от Я до А'
    },
    {
      value: yearAsc,
      label: 'По году выпуска, по возрастанию'
    },
    {
      value: yearDesc,
      label: 'По году выпуска, по убыванию'
    },
    {
      value: volumeAsc,
      label: 'По мощности, по возрастанию'
    },
    {
      value: volumeDesc,
      label: 'По мощности, по убыванию'
    }
  ];

  const sortDiv = createHTMLElement('div', 'search-form');

  const sortTitle = createHTMLElement('h2', 'filter-title');
  sortTitle.textContent = 'Сортировка';

  const sortSelect = createHTMLElement('select', 'sort-field');

  options.forEach(({ value, label }) => {
    const option = createHTMLElement('option');
    if (option instanceof HTMLOptionElement) {
      option.value = value;
      option.textContent = label;
      sortSelect.append(option);
    }
  });

  sortDiv.append(sortTitle, sortSelect);

  return sortDiv;
};
