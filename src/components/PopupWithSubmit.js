import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  setSubmitAction(callbackSubmitForm) {
    this._handleSubmitCallback = callbackSubmitForm; 
  }

  setEventListeners()  {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      //this.close();
    });
    super.setEventListeners();
  }

} 