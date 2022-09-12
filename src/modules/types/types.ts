export interface Card {
  id: string,
  image: string,
  brand: string,
  model: string,
  year: string,
  color: string,
  colorID: string
  favorite: boolean,
  doors: string,
  volume: string,
  owners: string,
  inBasket?: boolean
}

export enum BasketText {
  Yes = 'В корзине',
  No = 'В корзину'
}

export enum PopularText {
  Yes = 'Да',
  No = 'Нет'
}

export const maxBasketLimit = 20;
