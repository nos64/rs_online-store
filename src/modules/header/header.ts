import './header.scss';
import '../../img/basket.svg';
import { createHTMLElement } from '../types/createHTMLElement';

const header = createHTMLElement('header', 'header');
document.body.append(header);

const container = createHTMLElement('div', 'container', 'header__container');
header.append(container);

const h1 = createHTMLElement('h1', 'header__title');
h1.textContent = 'Retro cars online store';

const basketWrapper = createHTMLElement('div', 'header__basket-wrapper');

const basket = createHTMLElement('img', 'header__basket');
if (basket instanceof HTMLImageElement) {
  basket.src = 'img/basket.svg';
  basket.alt = 'Basket icon';
}

const basketCount = createHTMLElement('span', 'header_basket-count');
basketCount.textContent = '0';

basketWrapper.append(basket, basketCount);
container.append(h1, basketWrapper);
