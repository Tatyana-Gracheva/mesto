export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._popupEscButton = this._popupElement.querySelector('.popup__close');
    this.close = this.close.bind(this);
    this._handleOverlayClose = this._handleOverlayClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  _togglePopup() {
    this._popupElement.classList.toggle('popup_opened');
  };

  open() {
    this._togglePopup(); 
    document.addEventListener('keyup', this._handleEscClose);
  };

  close() {
    this._togglePopup();
    document.removeEventListener('keyup', this._handleEscClose);
  };

  _handleEscClose(evt) {
      if (evt.key === 'Escape') {
        if (this._popupElement.classList.contains('popup_opened')) {
          this.close();
        }
      } 
    };

  _handleOverlayClose(evt) {
    if (evt.target !== this._popupElement) {return}
    this.close();
  };

  setEventListeners() {
    this._popupElement.addEventListener('click', this._handleOverlayClose);
    this._popupEscButton.addEventListener('click', this.close);
  };
}