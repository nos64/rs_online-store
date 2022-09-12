import './settings.scss';
import { createHTMLElement } from '../../types/createHTMLElement';

export const createPopular = () => {
  const popularityDiv = createHTMLElement('div', 'search-form');

  const popularityLbl = createHTMLElement('label', 'popularity-lbl');
  popularityLbl.textContent = 'Показать только популярные';

  const popularityCheckbox = createHTMLElement('input', 'check', 'popularity-check');
  if (popularityCheckbox instanceof HTMLInputElement) {
    popularityCheckbox.type = 'checkbox';
  }
  popularityLbl.append(popularityCheckbox);
  popularityDiv.append(popularityLbl);

  return popularityDiv;
};
