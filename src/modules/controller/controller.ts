import { data } from '../main/main';
import { Card, maxBasketLimit } from '../types/types';
import { createCards } from '../main/content/content';
import { createHTMLElement } from '../types/createHTMLElement';
import { createVolumeSlider, minVolume, maxVolume } from './volumeSlider';
import { createYearSlider, minYear, maxYear } from './yearSlider';
import { sorting } from './sorting';

let modifyArr: Card[] = data;
const setingsWrapper: HTMLDivElement | null = document.querySelector('.settings-wrapper');

const elemBasketCount: HTMLElement | null = document.querySelector('.header_basket-count');
let basketCount = 0;
let inBasketArr: (string | undefined)[] = [];

export const resetSettingsBtn: HTMLButtonElement | null = document.querySelector('.reset-settings');
export const resetFiltersBtn: HTMLButtonElement | null = document.querySelector('.reset-filters');
const allCheckboxes: NodeListOf<HTMLInputElement> = document.querySelectorAll('.check');
const searchField: HTMLInputElement | null = document.querySelector('.search-form__search-field');

/** Фильтры */
export function filterGoods() {
  const popularCheck: HTMLInputElement | null = document.querySelector('.popularity-check');

  const brands: NodeListOf<HTMLInputElement> = document.querySelectorAll('.brand-checkbox:checked');
  const brandsArr = Array.from(brands).map(brand => brand.value);

  const colors: NodeListOf<HTMLInputElement> = document.querySelectorAll('.color-checkbox:checked');
  const colorsArr = Array.from(colors).map(color => color.value);

  const owners: NodeListOf<HTMLInputElement> = document.querySelectorAll('.owners-checkbox:checked');
  const ownersArr = Array.from(owners).map(owner => owner.value);

  modifyArr = data.filter(item => (
    (!brandsArr.length || brandsArr.includes(item.brand))
    && (!colorsArr.length || colorsArr.includes(item.color))
    && (!ownersArr.length || ownersArr.includes(item.owners))
    && (!minVolume || Number(minVolume?.value) <= +item.volume)
    && (!maxVolume || Number(maxVolume?.value) >= +item.volume)
    && (!minYear || Number(minYear?.value) <= +item.year)
    && (!maxYear || Number(maxYear?.value) >= +item.year)
  ));

  /** Показать популярные */
  if (popularCheck?.checked) {
    modifyArr = modifyArr.filter(item => item.favorite === true);
  }

  /** Поиск */
  const searchValue = searchField?.value.toLowerCase().trim();
  if (searchValue) {
    modifyArr = modifyArr.filter(item => item.brand.toLowerCase().search(searchValue) !== -1);
  }

  sorting(modifyArr);
  createCards(modifyArr);
  localStorage.setItem('modifyArr', JSON.stringify(modifyArr));
}

/** Корзина */
const changeBasketCount = () => {
  if (elemBasketCount) {
    if (basketCount > 0) {
      elemBasketCount.style.opacity = '1';
      elemBasketCount.textContent = String(basketCount);
    } else {
      elemBasketCount.style.opacity = '0';
    }
  }
};

const showWarningMessage = () => {
  const overflowPage = createHTMLElement('div', 'overflowPage');
  const popup = createHTMLElement('div', 'window');
  const popupText = createHTMLElement('p', 'window-text');
  popupText.textContent = 'Извините все слоты заняты';

  popup.append(popupText);
  overflowPage.append(popup);
  document.body.append(overflowPage);

  overflowPage.addEventListener('click', () => {
    overflowPage.remove();
  });
};

/** Добавление/удаление товара в корзину/из корзины */
function addDatainBasket() {
  modifyArr.forEach(item => {
    if (inBasketArr.includes(item.id)) {
      item.inBasket = true;
    }
  });
}

function delDatainBasket() {
  modifyArr.forEach(item => {
    if (!inBasketArr.includes(item.id)) {
      item.inBasket = false;
    }
  });
}

const contentWrapper = document.querySelector('.content-wrapper');
contentWrapper?.addEventListener('click', e => {
  if (e.target instanceof HTMLElement && e.target.classList.contains('settings-btn')
    && e.target.parentNode && e.target.parentNode instanceof HTMLElement) {
    if (!e.target.classList.contains('settings-btn-active')) {
      if (basketCount < maxBasketLimit) {
        e.target.parentNode.classList.add('card-active');
        e.target.classList.add('settings-btn-active');
        e.target.textContent = 'В корзине';
        basketCount++;
        inBasketArr.push(e.target.parentNode.dataset.id);
        addDatainBasket();
      } else {
        showWarningMessage();
      }
    } else {
      e.target.classList.remove('settings-btn-active');
      e.target.parentNode.classList.remove('card-active');
      e.target.textContent = 'В корзину';
      basketCount--;
      inBasketArr.splice(inBasketArr.indexOf(e.target.parentNode.dataset.id), 1);
      delDatainBasket();
    }
  }
  changeBasketCount();
  localStorage.setItem('basketCount', JSON.stringify(basketCount));
  localStorage.setItem('modifyArr', JSON.stringify(modifyArr));
  localStorage.setItem('inBasketArr', JSON.stringify(inBasketArr));
});

/** Получение данных из хранилища */
function getFromStorage() {
  const startData: Card[] = JSON.parse(<string>localStorage.getItem('modifyArr')) || [];
  const basketCnt: string[] = JSON.parse(<string>localStorage.getItem('basketCount')) || [];
  const basketArr: string[] = JSON.parse(<string>localStorage.getItem('inBasketArr')) || [];
  if (startData.length) {
    createCards(startData);
  } else {
    createCards(data);
  }
  if (basketCnt) {
    basketCount = +basketCnt;
  }
  if (basketArr) inBasketArr = basketArr;
  changeBasketCount();
}

/** Сброс фильтров */
resetFiltersBtn?.addEventListener('click', e => {
  e.preventDefault();
  allCheckboxes.forEach(check => {
    if (check.checked) check.checked = false;
  });
  if (searchField) searchField.value = '';

  getFromStorage();
});

/** Сброс настроек */
resetSettingsBtn?.addEventListener('click', e => {
  e.preventDefault();
  if (localStorage.getItem('modifyArr')) {
    localStorage.removeItem('modifyArr');
  }
  if (localStorage.getItem('basketCount')) {
    localStorage.removeItem('basketCount');
  }
  if (localStorage.getItem('inBasketArr')) {
    localStorage.removeItem('inBasketArr');
  }
  window.location.reload();
});

createVolumeSlider();
createYearSlider();
setingsWrapper?.addEventListener('input', filterGoods);
window.addEventListener('load', getFromStorage);
window.addEventListener('load', addDatainBasket);
