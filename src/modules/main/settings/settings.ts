import './settings.scss';
import { createHTMLElement } from '../../types/createHTMLElement';
import { createSearch } from './createSearch';
import { createPopular } from './createPopular';
import { createSort } from './createSort';
import { createVolumeSlider, createYearSlider } from './cretateSliders';
import { createByFilter } from './createCheckboxFilters';

export const createSettingsWrapper = () => {
  const settingsWrapper = createHTMLElement('div', 'settings-wrapper');

  /** Строка поиска */
  const searchForm = createSearch();

  /** Показать популярные */
  const popularityDiv = createPopular();

  /** Сортировка */
  const sortDiv = createSort();

  /** Обертки слайдеров */
  const rangeDiv = createHTMLElement('div', 'range-filters');

  /** Слайдер по мощности двигателя */
  const volumeWrapper = createVolumeSlider();
  /** Слайдер по году выпуска */
  const yearWrapper = createYearSlider();

  rangeDiv.append(volumeWrapper, yearWrapper);

  /** Чекбокс фильтры */
  const filterWrapper = createHTMLElement('div', 'filters-value');

  // /** Фильтр по Бренду */
  const byBrandWrapper = createByFilter('brand', 'Марка');
  /** Фильтр по цвету */
  const byColorWrapper = createByFilter('color', 'Цвет');
  /** Фильтр по собственникам */
  const byOwnersWrapper = createByFilter('owners', 'Количество собственников');

  filterWrapper.append(byBrandWrapper, byColorWrapper, byOwnersWrapper);

  const resetFiltersBtn = createHTMLElement('button', 'settings-btn', 'reset-filters');
  resetFiltersBtn.textContent = 'Сброс фильтров';

  const resetSettingsBtn = createHTMLElement('button', 'settings-btn', 'reset-settings');
  resetSettingsBtn.textContent = 'Сброс настроек';

  settingsWrapper.append(
    searchForm,
    popularityDiv,
    sortDiv,
    rangeDiv,
    filterWrapper,
    resetFiltersBtn,
    resetSettingsBtn
  );

  return settingsWrapper;
};
