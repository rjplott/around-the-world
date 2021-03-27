import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { cards as initialCards } from "./cards.js";
import { openPopup, closePopup } from "./utils.js";

// Variable declaration

const validatorSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardTemplateSelector = "#card-template";
const userProfile = document.querySelector(".profile");
const addImagePopup = document.querySelector(".popup_purpose_add-picture");
const editUserPopup = document.querySelector(".popup_purpose_edit-user");
const addImageSubmit = addImagePopup.querySelector(
  validatorSettings.submitButtonSelector
);
const gallery = document.querySelector(".gallery");
const popups = document.querySelectorAll(".popup");

const userName = userProfile.querySelector(".profile__user-name");
const userTitle = userProfile.querySelector(".profile__user-title");
const editButton = userProfile.querySelector(".profile__edit-button");
const addButton = userProfile.querySelector(".profile__add-image-button");

const userNameInput = editUserPopup.querySelector(".popup__input_type_name");
const userTitleInput = editUserPopup.querySelector(
  ".popup__input_type_user-title"
);

const imageTitleInput = addImagePopup.querySelector(
  ".popup__input_type_image-title"
);
const imageLinkInput = addImagePopup.querySelector(
  ".popup__input_type_image-link"
);

// Utility Functions

const createInitialCards = () => {
  initialCards.forEach((card) => {
    const cardElement = new Card(card, cardTemplateSelector);
    gallery.append(cardElement.generateCard());
  });
};

const createNewCard = () => {
  const cardData = {
    description: imageTitleInput.value,
    link: imageLinkInput.value,
  };
  const cardElement = new Card(cardData, cardTemplateSelector);
  gallery.prepend(cardElement.generateCard());
  imageLinkInput.value = "";
  imageTitleInput.value = "";
  addImageSubmit.classList.add(validatorSettings.inactiveButtonClass);
  addImageSubmit.setAttribute("disabled", "");
};

const setUserText = () => {
  userNameInput.value = userName.textContent;
  userTitleInput.value = userTitle.textContent;
};

const updateUserProfile = () => {
  userName.textContent = userNameInput.value;
  userTitle.textContent = userTitleInput.value;
};

// Event Handlers

const handleOpenEditPopup = () => {
  setUserText();
  openPopup(editUserPopup);
};

const handleAddImagePopup = () => {
  openPopup(addImagePopup);
};

const handleEditUserSubmit = (evt) => {
  evt.preventDefault();
  updateUserProfile();
  closePopup(evt.target.closest(".popup"));
};

const handleAddImageSubmit = (evt) => {
  evt.preventDefault();
  createNewCard();
  closePopup(evt.target.closest(".popup"));
};

const createFormValidators = () => {
  const forms = Array.from(
    document.querySelectorAll(validatorSettings.formSelector)
  );
  forms.forEach((form) => {
    const validator = new FormValidator(validatorSettings, form);
    validator.enableValidation();
  });
};

// Function Invocations

createInitialCards();
setUserText();

editButton.addEventListener("click", handleOpenEditPopup);
addButton.addEventListener("click", handleAddImagePopup);
editUserPopup.addEventListener("submit", handleEditUserSubmit);
addImagePopup.addEventListener("submit", handleAddImageSubmit);

popups.forEach((popup) => {
  popup.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("popup_opened")) {
      closePopup(popup);
    }

    if (evt.target.classList.contains("popup__close")) {
      closePopup(popup);
    }
  });
});

createFormValidators();
