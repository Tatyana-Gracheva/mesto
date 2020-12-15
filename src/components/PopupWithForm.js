import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, callbackSubmitForm}) {
    super(popupSelector);
    this._callbackSubmitForm = callbackSubmitForm;
    this._popupFormFirstInput = this._popupElement.querySelector('.popup__input_type_fist-value');
    this._popupFormSecondInput = this._popupElement.querySelector('.popup__input_type_second-value');
    this._popupFormElement = this._popupElement.querySelector('.popup__content');
    this._inputList = this._popupElement.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);
    return this._formValues;
  }

  setEventListeners()  {
    this._popupElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmitForm(this._getInputValues());
    });
    super.setEventListeners();
  }

  close() {
    super.close();
    this._popupElement.removeEventListener('submit', this._callbackSubmitForm);
    this._popupFormElement.reset();
  }

  setInputValues({firstValue, secondValue}) {
      this._popupFormFirstInput.value = firstValue;
      this._popupFormSecondInput.value = secondValue;
  }
} 