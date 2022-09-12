import './settings.scss';
import { data } from '../main';
import { createHTMLElement } from '../../types/createHTMLElement';
import { checkboxFilterTypes } from '../../types/checkboxTypes';

export const createByFilter = (
  nameFilter: checkboxFilterTypes,
  title: string
) => {
  const filterWrapper = createHTMLElement('div', `filters-value__${nameFilter}`);

  const filterTitle = createHTMLElement('h2', 'filter-title');
  filterTitle.textContent = `${title}`;

  const checkboxWrapper = createHTMLElement('div', 'checkbox-wrapper');

  const filterSet: Set<string> = new Set();
  data.forEach((item) => filterSet.add(item[nameFilter]));

  const filterArray = Array.from(filterSet);
  if (nameFilter === 'owners') {
    filterArray.sort((a: string, b: string) => +a - +b);
  } else {
    filterArray.sort();
  }

  filterArray.forEach(item => {
    const label = createHTMLElement('label', 'checkbox-lbl');
    label.textContent = item;

    const input = createHTMLElement('input', 'check', `${nameFilter}-checkbox`);
    if (input instanceof HTMLInputElement) {
      input.type = 'checkbox';
      input.value = item;
    }

    label.append(input);
    checkboxWrapper.append(label);
  });

  filterWrapper.append(filterTitle, checkboxWrapper);
  return filterWrapper;
};
