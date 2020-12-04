export class FormValidator {
  constructor(objectToValidate, form) {
    this._inputSelector = objectToValidate.inputSelector;
    this._inactiveButtonClass = objectToValidate.inactiveButtonClass;
    this._submitButtonSelector = objectToValidate.submitButtonSelector;
    this._inputErrorClass = objectToValidate.inputErrorClass;
    this._errorClass = objectToValidate.errorClass;
    this._form = form;
  }

  //метод запуска проверки на валидность
  enableValidation() {
      this._form.addEventListener('submit', (evt) => {
        // У каждой формы отменим стандартное поведение
        evt.preventDefault();
      });
      //вызываем функцию, навешивающую слушатель на каждый инпут формы 
      this._setEventListeners();
    }
  
  //метод, навешивающая слушатель на каждый инпут формы при внесении любого символа пользователем
  _setEventListeners() {
    //создаем массив инпутов формы
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    //делаем кнопку отправки неактивной при открытии попапов
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        //вызываем метод проверки на валидность инпута
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  //метод проверки на хотябы одно невалидное поле
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //метод, делающий кнопку неактивной
  disabledButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }
  enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }
  
  //метод изменения активности кнопок в зависимости от того, какое значение вернет метод hasInvalidInput
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.disabledButton();
    } else {
      this.enableButton();
    }
  }
    
  //метод проверки на валидность инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {    
      //вызов метода показа ошибки, если поле невалидно
      this._showInputError(inputElement, inputElement.validationMessage);
    } else { 
      //иначе - вызов метода скрытия ошибки  
      this._hideInputError(inputElement);
    }
  };

  //метод показа ошибки, если поле невалидно
  _showInputError(inputElement, errorMessage) {
    //вызов метода поиска элемента, (в который нужно записать)/(в котором нужно скрыть) ошибку
    const errorElement = this._searchErrorInput(inputElement);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  //метод скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._searchErrorInput(inputElement);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //метод поиска элемента, (в который нужно записать)/(в котором нужно скрыть) ошибку
  _searchErrorInput(inputElement){
    return this._form.querySelector(`#${inputElement.name}-error`);
  }
}
