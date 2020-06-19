const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile-info__edit-button');
const popupCloseButton = popup.querySelector('.popup__close');

const popupToggle = function () {
  popup.classList.toggle('popup__opened');
}
popupOpenButton.addEventListener('click', popupToggle);
popupCloseButton.addEventListener('click', popupToggle);

const profileInfo = document.querySelector('.profile-info');
const formElement = popup.querySelector('.popup__content');

function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                      // Так мы можем определить свою логику отправки.
                      // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  let nameInput = popup.querySelector('.popup__input-name');
  let jobInput = popup.querySelector('.popup__input-about');

  // Выберите элементы, куда должны быть вставлены значения полей
  let profileName = profileInfo.querySelector('.profile-info__name');
  let profileJob = profileInfo.querySelector('.profile-info__about');
  

  // Вставьте новые значения с помощью textContent
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  popup.classList.toggle('popup__opened');

}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);