import { deleteCard, openImageBig } from './cardFunction.js';
import { popupImageBig } from './popupFunction.js'

export class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  //приватный метод создания разметки для новой карточки
  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
	}
  
  //приватный метод установки слушателей на карточку
  _setEventListeners(popupOpenButtonImageBig) {
    const cardDeleteButton = this._card.querySelector('.element__delet');
    const cardLikeButton = this._card.querySelector('.element__like');
    
    //обработчик события "клик по кнопке удаления"
    cardDeleteButton.addEventListener('click', deleteCard);
    //обработчик события "лайк на карточке"
    cardLikeButton.addEventListener('click',() => {
      cardLikeButton.classList.toggle('element__like_active')
    });
    
    //обработчик события "открыть большую картинку"
    popupOpenButtonImageBig.addEventListener('click', () => {
      openImageBig(popupImageBig, this);
    });

  }
  
  //метод добавления данных в карточку
  createCard() {
    this._card = this._getTemplate();
    const popupOpenButtonImageBig = this._card.querySelector('.element__image');
    popupOpenButtonImageBig.src = this._link;
    popupOpenButtonImageBig.alt += this._name;
    this._card.querySelector('.element__name').textContent = this._name;
    this._setEventListeners(popupOpenButtonImageBig);
    return this._card;
  }
}