import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './sliders.scss';
import { data } from '../main/main';
import { filterGoods, resetFiltersBtn } from './controller';

export const minYear: HTMLInputElement | null = document.querySelector('.year-min');
export const maxYear: HTMLInputElement | null = document.querySelector('.year-max');

export function createYearSlider() {
  const yearSlider: noUiSlider.target | null = document.getElementById('year-slider');

  if (!yearSlider || !minYear || !maxYear) return;

  const arrYear: number[] = [];
  data.forEach(item => arrYear.push(+item.year));
  arrYear.sort((a, b) => a - b);

  const inputs = [minYear, maxYear];

  if (yearSlider) {
    noUiSlider.create(yearSlider, {
      start: [arrYear[0], arrYear[arrYear.length - 1]],
      tooltips: [true, true],
      connect: true,
      range: {
        min: arrYear[0],
        max: arrYear[arrYear.length - 1]
      },
      step: 1,
      format: {
        to: (value: number) => Math.round(value),
        from: (value: string) => Number((value))
      }
    });
  }

  yearSlider.noUiSlider?.on('update', (values: (string | number)[], handle: number): void => {
    if (values) {
      inputs[handle].value = String(values[handle]);
    }
  });

  yearSlider.noUiSlider?.on('slide', filterGoods);

  minYear.addEventListener('change', () => {
    yearSlider.noUiSlider?.set([minYear.value, 'null']);
  });

  maxYear.addEventListener('change', () => {
    yearSlider.noUiSlider?.set(['null', maxYear.value]);
  });

  resetFiltersBtn?.addEventListener('click', () => {
    yearSlider.noUiSlider?.set([arrYear[0], arrYear[arrYear.length - 1]]);
    filterGoods();
  });
}
