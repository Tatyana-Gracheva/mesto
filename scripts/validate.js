const formObject = {
  formSelector: '.popup__content',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit-button',
  inactiveButtonClass: 'popup__submit-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
}

//функция запуска проверки на валидность
function enableValidation ({formSelector, ...rest}) {
  //сщздаем массив форм
  const forms = Array.from(document.querySelectorAll(formSelector));
  //проходим весь массив форм
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => {
      // У каждой формы отменим стандартное поведение
      evt.preventDefault();
    });
    //вызываем функцию, навешивающую слушатель на каждый инпут формы 
    setEventListeners(form, rest);
  })
}

//функция, навешивающая слушатель на каждый инпут формы при внесении любого символа пользователем
function setEventListeners (form, {inputSelector, submitButtonSelector, ...rest}) {
  //создаем массив инпутов формы
  const inputList = Array.from(form.querySelectorAll(inputSelector));

  const buttonElement = form.querySelector(submitButtonSelector);
  //делаем кнопку отправки неактивной при открытии попапов
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      //вызываем функцию проверки на валидность инпута
      checkInputValidity(form, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
}

//функция проверки на хотябы одно невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//функция, делающая кнопку неактивной
function disabledButton(button, inactiveSelector) {
  button.classList.add(inactiveSelector);
  button.setAttribute('disabled', true);
}

//функция изменения активности кнопок в зависимости от того, какое значение вернет функция hasInvalidInput
function toggleButtonState(inputList, buttonElement, {inactiveButtonClass}) {
  if (hasInvalidInput(inputList)) {
    disabledButton(buttonElement, inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
}
  
//функция проверки на валидность инпута
const checkInputValidity = (form, inputElement, {...rest}) => {
  if (!inputElement.validity.valid) {    
    //вызов функции показа ошибки, если поле невалидно
    showInputError(form, inputElement, inputElement.validationMessage, rest);
  } else { 
    //иначе - вызов функции скрытия ошибки  
    hideInputError(form, inputElement, rest);
  }
};

//функция показа ошибки, если поле невалидно
const showInputError = (form, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
  //вызов функции поиска элемента, (в который нужно записать)/(в котором нужно скрыть) ошибку
  const errorElement = searchErrorInput(form, inputElement);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

//функция скрытия ошибки
const hideInputError = (form, inputElement, {inputErrorClass, errorClass}) => {
  const errorElement = searchErrorInput(form, inputElement);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

//функция поиска элемента, (в который нужно записать)/(в котором нужно скрыть) ошибку
function searchErrorInput(form, inputElement) {
  return form.querySelector(`#${inputElement.name}-error`);
}

enableValidation(formObject);