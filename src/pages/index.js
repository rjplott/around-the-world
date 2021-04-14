import Card from "../script/modules/Card.js";
import FormValidator from "../script/modules/FormValidator.js";
import Section from "../script/modules/Section.js";
import PopupWithImage from "../script/modules/PopupWithImage.js";
import PopupWithForm from "../script/modules/PopupWithForm.js";
import UserInfo from "../script/modules/UserInfo.js";
import Api from "../script/modules/Api.js";
import { cards as initialCards } from "../script/utils/cards.js";
import {
  validatorSettings,
  cardTemplateSelector,
  cardSectionSelector,
  userName,
  userTitle,
  editButton,
  addButton,
  userNameInput,
  userTitleInput,
  imageTitleInput,
  imageLinkInput,
  apiOptions,
} from "../script/utils/constants.js";
import "./index.css";

// Helper Functions

const resetUserInput = () => {
  const user = userInformation.getUserInfo();

  userNameInput.value = user.name;
  userTitleInput.value = user.about;
};

const resetImageInput = () => {
  imageLinkInput.value = "";
  imageTitleInput.value = "";
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

const api = new Api(apiOptions);

const userInformation = new UserInfo({
  name: userName.textContent,
  about: userTitle.textContent,
});

const imagePopup = new PopupWithImage(".popup_purpose_view-full-picture");

const userPopup = new PopupWithForm(
  ".popup_purpose_edit-user",
  ({ "edit-user-name": name, "edit-user-title": about }) => {
    api.updateUserInformation({ name, about }).then((data) => {
      userInformation.setUserInfo(data);
      userPopup.close(resetUserInput);
    });
  }
);

resetUserInput();

const validators = createFormValidators();

api.getInitialCards().then((data) => {
  const cardSection = new Section(
    {
      items: data,
      renderer: (item) => {
        const cardElement = new Card(
          item,
          cardTemplateSelector,
          handleCardClick
        );
        cardSection.addItem(cardElement.generateCard());
      },
    },
    cardSectionSelector
  );

  cardSection.renderItems();

  const createNewCard = (cardData) => {
    const cardElement = new Card(
      cardData,
      cardTemplateSelector,
      handleCardClick
    );

    cardSection.addItem(cardElement.generateCard());
    resetImageInput();
    validators["add-image-form"].deactivateSaveButton();
  };

  const addCardPopup = new PopupWithForm(
    ".popup_purpose_add-picture",
    ({ "add-image-link": link, "add-image-title": name }) => {
      api.addCard({ name, link }).then((data) => {
        console.log(data);
        createNewCard(data);
        addCardPopup.close(resetImageInput);
      });
    }
  );

  addCardPopup.setEventListeners();

  addButton.addEventListener("click", () => {
    addCardPopup.open();
  });
});

userPopup.setEventListeners();
imagePopup.setEventListeners();

editButton.addEventListener("click", () => {
  resetUserInput();
  userPopup.open();
});

api.getUserInformation().then((data) => userInformation.setUserInfo(data));
