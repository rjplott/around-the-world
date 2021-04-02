import Card from "../script/modules/Card.js";
import FormValidator from "../script/modules/FormValidator.js";
import Section from "../script/modules/Section.js";
import PopupWithImage from "../script/modules/PopupWithImage.js";
import PopupWithForm from "../script/modules/PopupWithForm.js";
import UserInfo from "../script/modules/UserInfo.js";
import { cards as initialCards } from "../script/utils/cards.js";
import {
  validatorSettings,
  cardTemplateSelector,
  addImageSubmit,
  cardSectionSelector,
  userName,
  userTitle,
  editButton,
  addButton,
  userNameInput,
  userTitleInput,
  imageTitleInput,
  imageLinkInput,
} from "../script/utils/constants.js";
import "./index.css";

// Helper Functions

const resetUserInput = () => {
  const user = userInformation.getUserInfo();

  userNameInput.value = user.name;
  userTitleInput.value = user.job;
};

const resetImageInput = () => {
  imageLinkInput.value = "";
  imageTitleInput.value = "";
};

const createNewCard = () => {
  const cardData = {
    description: imageTitleInput.value,
    link: imageLinkInput.value,
  };

  const cardElement = new Card(cardData, cardTemplateSelector, handleCardClick);

  cardSection.addItem(cardElement.generateCard());
  imageLinkInput.value = "";
  imageTitleInput.value = "";
  validators["add-image-form"].deactivateSaveButton(
    addImageSubmit,
    validatorSettings.inactiveButtonClass
  );
};

const createFormValidators = () => {
  const forms = Array.from(
    document.querySelectorAll(validatorSettings.formSelector)
  );
  return forms.reduce((validators, form) => {
    const validator = new FormValidator(validatorSettings, form);
    validator.enableValidation();
    validators[form.getAttribute("name")] = validator;
    return validators;
  }, {});
};

const handleCardClick = (evt) => {
  imagePopup.open({
    url: evt.target.style.backgroundImage.slice(5, -2),
    text: evt.target.nextElementSibling.textContent,
  });
};

// Object instantiation

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(item, cardTemplateSelector, handleCardClick);
      cardSection.addItem(cardElement.generateCard());
    },
  },
  cardSectionSelector
);

const userInformation = new UserInfo({
  name: userName.textContent,
  job: userTitle.textContent,
});

const imagePopup = new PopupWithImage(".popup_purpose_view-full-picture");

const addCardPopup = new PopupWithForm(".popup_purpose_add-picture", () => {
  createNewCard();
  addCardPopup.close(resetImageInput);
});

const userPopup = new PopupWithForm(".popup_purpose_edit-user", () => {
  userInformation.setUserInfo({
    name: userNameInput.value,
    job: userTitleInput.value,
  });
  userPopup.close(resetUserInput);
});

cardSection.renderItems();
resetUserInput();

const validators = createFormValidators();

addCardPopup.setEventListeners();
userPopup.setEventListeners();
imagePopup.setEventListeners();

editButton.addEventListener("click", () => {
  resetUserInput();
  userPopup.open();
});

addButton.addEventListener("click", () => {
  addCardPopup.open();
});
