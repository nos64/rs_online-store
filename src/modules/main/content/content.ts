import './content.scss';
import { Card, BasketText, PopularText } from '../../types/types';
import { container } from '../main';
import { createHTMLElement } from '../../types/createHTMLElement';

const contentWrapper = createHTMLElement('div', 'content-wrapper');
container.append(contentWrapper);

export const createCards = (dataArr: Card[]) => {
  contentWrapper.textContent = '';
  dataArr.forEach(({
    id,
    brand,
    model,
    image,
    year,
    color,
    doors,
    volume,
    owners,
    favorite,
    inBasket
  }) => {
    const card = createHTMLElement('div', 'card');
    card.dataset.id = id;

    const cardTitle = createHTMLElement('h3', 'card__title');
    cardTitle.textContent = brand;

    const cardSubtitle = createHTMLElement('p', 'card__subtitle');
    cardSubtitle.textContent = model;

    const cardImageWrapper = createHTMLElement('div', 'card__image-wrapper');

    const cardImage = createHTMLElement('img', 'card__image');
    if (cardImage instanceof HTMLImageElement) {
      cardImage.src = image;
      cardImage.alt = `${brand} ${model}`;
      cardImageWrapper.append(cardImage);
    }

    const descriptionWrapper = createHTMLElement('div');

    const cardYear = createHTMLElement('p', 'card__description');
    cardYear.textContent = 'Год выпуска: ';

    const dataYear = createHTMLElement('span', 'card__year');
    dataYear.textContent = year;
    cardYear.append(dataYear);

    const cardColor = createHTMLElement('p', 'card__description');
    cardColor.textContent = 'Цвет: ';

    const dataColor = createHTMLElement('span', 'card__color');
    dataColor.textContent = color;
    cardColor.append(dataColor);

    const cardDoor = createHTMLElement('p', 'card__description');
    cardDoor.textContent = 'Количество дверей: ';

    const dataDoor = createHTMLElement('span', 'card__door');
    dataDoor.textContent = doors;
    cardDoor.append(dataDoor);

    const cardVolume = createHTMLElement('p', 'card__description');
    cardVolume.textContent = 'Мощность двигателя: ';

    const dataVolume = createHTMLElement('span', 'card__volume');
    dataVolume.textContent = volume;
    cardVolume.append(dataVolume);

    const cardOwners = createHTMLElement('p', 'card__description');
    cardOwners.textContent = 'Количество собственников: ';

    const dataOwners = createHTMLElement('span', 'card__volume');
    dataOwners.textContent = owners;
    cardOwners.append(dataOwners);

    const cardPopular = createHTMLElement('p', 'card__description');
    cardPopular.textContent = 'Популярный: ';

    const dataPopular = createHTMLElement('span', 'card__popular');
    dataPopular.textContent = favorite ? PopularText.Yes : PopularText.No;
    cardPopular.append(dataPopular);

    const addCartBtn = createHTMLElement('button', 'settings-btn');

    if (inBasket) {
      card.classList.add('card-active');
      addCartBtn.textContent = BasketText.Yes;
      addCartBtn.classList.add('settings-btn-active');
    } else {
      card.classList.remove('card-active');
      addCartBtn.textContent = BasketText.No;
      addCartBtn.classList.remove('settings-btn-active');
    }

    descriptionWrapper.append(cardYear, cardColor, cardDoor, cardVolume, cardOwners, cardPopular);
    card.append(cardTitle, cardSubtitle, cardImageWrapper, descriptionWrapper, addCartBtn);

    contentWrapper.append(card);
  });

  if (contentWrapper.textContent === '') contentWrapper.textContent = 'Извините, совпадений не обнаружено';
};
