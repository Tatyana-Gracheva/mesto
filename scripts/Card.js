export class Card {
  constructor({data, handleCardClick}, templateSelector) {
    this._name = data.firstValue;
    this._link = data.secondValue;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    const cardDeleted = this._card.querySelector('.element');

    //обработчик события "клик по кнопке удаления"
    cardDeleteButton.addEventListener('click', () => {
      this._deleteCard(cardDeleted)
    });
    //обработчик события "лайк на карточке"
    cardLikeButton.addEventListener('click',() => {
      cardLikeButton.classList.toggle('element__like_active')
    });
    //обработчик события "открыть большую картинку"
    popupOpenButtonImageBig.addEventListener('click', () => {
      this._handleCardClick();
    });

  }
  
  _deleteCard(cardDeleted) {
    cardDeleted.remove();
  }

  //метод добавления данных в карточку
  createCard = () => {
    this._card = this._getTemplate();
    const popupOpenButtonImageBig = this._card.querySelector('.element__image');
    popupOpenButtonImageBig.src = this._link;
    popupOpenButtonImageBig.alt += this._name;
    this._card.querySelector('.element__name').textContent = this._name;
    
    this._setEventListeners(popupOpenButtonImageBig);
    return this._card;
  }
}