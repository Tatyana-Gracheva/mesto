import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
  }

  open(data) {
    const popupImage =  this._popupElement.querySelector('.popup__box-image');
    popupImage.src = data.secondValue;
    popupImage.alt += data.firstValue;
    this._popupElement.querySelector('.popup__box-title').textContent = data.firstValue;
    super.open();
  }
}