import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

// Variable declaration

const cardTemplateSelector = "#card-template";
const userProfile = document.querySelector(".profile");
const addImagePopup = document.querySelector(".popup_purpose_add-picture");
const editUserPopup = document.querySelector(".popup_purpose_edit-user");
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

const validatorSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Utility Functions

const createInitialCards = () => {
  const initialCards = [
    {
      description: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
      description: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
      description: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
      description: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
      description: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
      description: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
  ];

  initialCards.forEach((card) => {
    const cardElement = new Card(card, cardTemplateSelector);
    gallery.append(cardElement.generateCard());
  });
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
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

const verifyEscapeKeyPressed = (key) => key === "Escape";

const closeByEscape = (evt) => {
  if (verifyEscapeKeyPressed(evt.key)) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
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
