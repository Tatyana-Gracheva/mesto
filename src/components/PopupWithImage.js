import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector)
    this._popupImage = this._popupElement.querySelector('.popup__box-image');
  }

  open(data) {
    this._popupImage.src = data.link;
    this._popupImage.alt = `Здесь фото ${data.name}`; 
    this._popupElement.querySelector('.popup__box-title').textContent = data.name;
    super.open();
  }
}