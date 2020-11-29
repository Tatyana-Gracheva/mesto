export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._popupEscButton = this._popupElement.querySelector('.popup__close');
  }

  _togglePopup() {
    this._popupElement.classList.toggle('popup_opened');
  };

  open() {
    this._togglePopup(); 
  };

  close() {
    this._togglePopup();
    document.removeEventListener('keyup', this._handleEscClose);
    this._popupEscButton.removeEventListener('click', this.close);
  };

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        this.close();
      } 
    };

  _handleOverlayClose(evt) {
    if (evt.target !== this._popupElement) {return}
    this.close();
  };

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleOverlayClose.bind(this));
    document.addEventListener('keyup', this._handleEscClose.bind(this));
    this._popupEscButton.addEventListener('click', this.close.bind(this));
  };
}