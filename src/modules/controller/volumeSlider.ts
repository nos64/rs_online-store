import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import './sliders.scss';
import { data } from '../main/main';
import { filterGoods, resetFiltersBtn } from './controller';

export const minVolume: HTMLInputElement | null = document.querySelector('.volume-min');
export const maxVolume: HTMLInputElement | null = document.querySelector('.volume-max');

export function createVolumeSlider() {
  const volumeSlider: noUiSlider.target | null = document.getElementById('volume-slider');

  if (!volumeSlider || !minVolume || !maxVolume) return;

  const arrVolume: number[] = [];
  data.forEach(item => arrVolume.push(+item.volume));
  arrVolume.sort((a, b) => a - b);

  const inputs = [minVolume, maxVolume];

  if (volumeSlider) {
    noUiSlider.create(volumeSlider, {
      start: [arrVolume[0], arrVolume[arrVolume.length - 1]],
      tooltips: [true, true],
      connect: true,
      range: {
        min: arrVolume[0],
        max: arrVolume[arrVolume.length - 1]
      },
      step: 1,
      format: {
        to: (value: number) => Math.round(value),
        from: (value: string) => Number((value))
      }
    });
  }

  volumeSlider.noUiSlider?.on('update', (values: (string | number)[], handle: number): void => {
    if (values) {
      inputs[handle].value = String(values[handle]);
    }
  });

  volumeSlider.noUiSlider?.on('slide', filterGoods);

  minVolume.addEventListener('change', () => {
    volumeSlider.noUiSlider?.set([minVolume.value, 'null']);
  });

  maxVolume.addEventListener('change', () => {
    volumeSlider.noUiSlider?.set(['null', maxVolume.value]);
  });

  resetFiltersBtn?.addEventListener('click', () => {
    volumeSlider.noUiSlider?.set([arrVolume[0], arrVolume[arrVolume.length - 1]]);
    filterGoods();
  });
}
