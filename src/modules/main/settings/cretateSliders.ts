import './settings.scss';
import { createHTMLElement } from '../../types/createHTMLElement';

export const createVolumeSlider = () => {
  const volumeWrapper = createHTMLElement('div', 'range-filters__volume');

  const volumeTitle = createHTMLElement('h2', 'filter-title');
  volumeTitle.textContent = 'Мощность двигателя (л.с.)';

  const volumeFieldWrapper = createHTMLElement('div', 'range-wrapper');

  const minVolume = createHTMLElement('input', 'range-field', 'volume-min');
  if (minVolume instanceof HTMLInputElement) {
    minVolume.type = 'number';
    minVolume.value = '';
  }

  const volumeSlider = createHTMLElement('div');
  volumeSlider.id = 'volume-slider';

  const maxVolume = createHTMLElement('input', 'range-field', 'volume-max');
  if (maxVolume instanceof HTMLInputElement) {
    maxVolume.type = 'number';
    maxVolume.value = '';
  }

  volumeFieldWrapper.append(minVolume, volumeSlider, maxVolume);
  volumeWrapper.append(volumeTitle, volumeFieldWrapper);

  return volumeWrapper;
};

export const createYearSlider = () => {
  const yearWrapper = createHTMLElement('div', 'range-filters__year');

  const yearTitle = createHTMLElement('h2', 'filter-title');
  yearTitle.textContent = 'Год выпуска';

  const yearFieldWrapper = createHTMLElement('div', 'range-wrapper');

  const minYear = createHTMLElement('input', 'range-field', 'year-min');
  if (minYear instanceof HTMLInputElement) {
    minYear.type = 'number';
    minYear.value = '';
  }

  const yearSlider = createHTMLElement('div');
  yearSlider.id = 'year-slider';

  const maxYear = createHTMLElement('input', 'range-field', 'year-max');
  if (maxYear instanceof HTMLInputElement) {
    maxYear.type = 'number';
    maxYear.value = '';
  }

  yearFieldWrapper.append(minYear, yearSlider, maxYear);
  yearWrapper.append(yearTitle, yearFieldWrapper);

  return yearWrapper;
};
