import Card from "../script/modules/Card.js";
import FormValidator from "../script/modules/FormValidator.js";
import Section from "../script/modules/Section.js";
import PopupWithImage from "../script/modules/PopupWithImage.js";
import PopupWithForm from "../script/modules/PopupWithForm.js";
import UserInfo from "../script/modules/UserInfo.js";
import Api from "../script/modules/Api.js";
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
  editProfileElement,
  profilePicture,
  editImageInput,
  fullImage,
  imageCaption,
} from "../script/utils/constants.js";
import "./index.css";

// Helper Functions

const updateProfileInputs = () => {
  const user = userInformation.getUserInfo();

  userNameInput.value = user.name;
  userTitleInput.value = user.about;
};

const resetImageInput = () => {
  imageLinkInput.value = "";
  imageTitleInput.value = "";
};

const resetEditImageInput = () => {
  editImageInput.value = "";
  validators["edit-profile-picture-form"].deactivateSaveButton();
};

const verifyEscapeKeyPressed = (key) => key === "Escape";

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

const handleCardClick = (name, link) => {
  imagePopup.open({
    url: link,
    text: name,
  });
};

const handleApiError = (error) => console.log(error);

// Object instantiation

const api = new Api(apiOptions);

const userInformation = new UserInfo(userName, userTitle, profilePicture);

api
  .getUserInformation()
  .then((data) => {
    userInformation.setUserInfo(data);
    return userInformation;
  })
  .then((userInformation) => {
    api
      .getInitialCards()
      .then((data) => {
        const user = userInformation.getUserInfo();

        const handleDeleteCard = (card) => {
          removeCardPopup.setValue(card);
          removeCardPopup.open();
        };

        const handleClickLikeButton = (card) => {
          if (card.getLiked()) {
            api
              .removeLike(card.getId())
              .then((data) => {
                card.updateCard(data, user);
              })
              .catch(handleApiError);
          } else {
            api
              .addLike(card.getId(), userInformation.getUserInfo())
              .then((data) => {
                card.updateCard(data, user);
              })
              .catch(handleApiError);
          }
        };

        const createNewCard = (cardData) => {
          const cardElement = new Card(
            cardData,
            cardTemplateSelector,
            handleCardClick,
            handleDeleteCard,
            handleClickLikeButton
          );

          return cardElement;
        };

        const cardSection = new Section(
          {
            items: data,
            renderer: (item) => {
              const cardElement = createNewCard(item);
              cardSection.addItem(cardElement.generateCard(user.id));
            },
          },
          cardSectionSelector
        );

        cardSection.renderItems();

        const addCardPopup = new PopupWithForm(
          ".popup_purpose_add-picture",
          verifyEscapeKeyPressed,
          ({ "add-image-link": link, "add-image-title": name }) => {
            api
              .addCard({ name, link })
              .then((data) => {
                const cardElement = createNewCard(data);

                cardSection.addItem(cardElement.generateCard(user.id));
                resetImageInput();
                validators["add-image-form"].deactivateSaveButton();
                addCardPopup.close(resetImageInput);
              })
              .catch(handleApiError);
          }
        );

        addCardPopup.setEventListeners();
        removeCardPopup.setEventListeners();

        addButton.addEventListener("click", () => {
          validators["add-image-form"].resetValidation();
          addCardPopup.open();
        });
      })
      .catch(handleApiError);
  })
  .catch(handleApiError);

const imagePopup = new PopupWithImage(
  ".popup_purpose_view-full-picture",
  verifyEscapeKeyPressed,
  fullImage,
  imageCaption
);

const userPopup = new PopupWithForm(
  ".popup_purpose_edit-user",
  verifyEscapeKeyPressed,
  ({ "edit-user-name": name, "edit-user-title": about }) => {
    api
      .updateUserInformation({ name, about })
      .then((data) => {
        userInformation.setUserInfo(data);
        userPopup.close();
      })
      .catch(handleApiError);
  }
);

const removeCardPopup = new PopupWithForm(
  ".popup_purpose_remove-card",
  verifyEscapeKeyPressed,
  (card) => {
    api
      .deleteCard(card.getId())
      .then(() => {
        card.deleteCard();
        removeCardPopup.close();
      })
      .catch(handleApiError);
  }
);

const editProfilePicturePopup = new PopupWithForm(
  ".popup_purpose_edit-profile-picture",
  verifyEscapeKeyPressed,
  ({ "edit-picture-link": avatar }) => {
    api
      .updateUserAvartar({ avatar })
      .then((data) => {
        userInformation.setUserInfo(data);
        editProfilePicturePopup.close(resetEditImageInput);
      })
      .catch(handleApiError);
  }
);

const validators = createFormValidators();

userPopup.setEventListeners();
imagePopup.setEventListeners();
editProfilePicturePopup.setEventListeners();

editButton.addEventListener("click", () => {
  updateProfileInputs();
  validators["edit-user-form"].resetValidation();
  userPopup.open();
});

editProfileElement.addEventListener("click", () => {
  validators["edit-profile-picture-form"].resetValidation();
  editProfilePicturePopup.open();
});
