import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callbackSubmitForm}) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupForm = document.querySelector(this._popupSelector);
    this._popupFormFirstInput = this._popupForm.querySelector('.popup__input_type_fist-value');
    this._popupFormSecondInput = this._popupForm.querySelector('.popup__input_type_second-value');
    this._popupFormElement = this._popupForm.querySelector('.popup__content');
  }

  _getInputValues() {
    this._popupFirstValue = this._popupFormFirstInput.value;
    this._popupSecondValue = this._popupFormSecondInput.value;
    return {firstValue: this._popupFirstValue, secondValue: this._popupSecondValue};
  }

  setEventListeners()  {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
      this.close();
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupForm.removeEventListener('submit', this._callbackSubmitForm);
    if (this._popupSelector !== '.popup_edit-profile') {
      this._popupFormFirstInput.value = '';
      this._popupFormSecondInput.value = '';
    }
  }

  setInputValues({user, info}) {
      this._popupFormFirstInput.value = user.textContent;
      this._popupFormSecondInput.value = info.textContent;
  }
} 