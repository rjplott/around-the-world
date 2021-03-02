// Variable declaration

const userProfile = document.querySelector(".profile");
const addImagePopup = document.querySelector(".popup_purpose_add-picture");
const editUserPopup = document.querySelector(".popup_purpose_edit-user");
const cardTemplate = document.querySelector("#card-template");
const gallery = document.querySelector(".gallery");
const imagePopup = document.querySelector(".popup_purpose_view-full-picture");
const popups = document.querySelectorAll(".popup");

const userName = userProfile.querySelector(".profile__user-name");
const userTitle = userProfile.querySelector(".profile__user-title");
const editButton = userProfile.querySelector(".profile__edit-button");
const addButton = userProfile.querySelector(".profile__add-image-button");
const imageContainer = imagePopup.querySelector(".popup__full-image-container");
const fullImage = imageContainer.querySelector(".popup__full-image");
const imageCaption = imageContainer.querySelector(".popup__image-caption");

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

const createCard = (name, link) => {
  const newCard = cardTemplate.content.querySelector(".card").cloneNode(true);
  const newCardImage = newCard.querySelector(".card__image");

  newCardImage.style.backgroundImage = `url("${link}")`;
  newCardImage.addEventListener("click", handleOpenImagePopup);
  newCard.querySelector(".card__label").textContent = name;
  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeButtonClick);
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDeleteCard);

  return newCard;
};

const createInitialCards = () => {
  const initialCards = [
    {
      name: "Yosemite Valley",
      link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
    },
    {
      name: "Lake Louise",
      link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
    },
    {
      name: "Bald Mountains",
      link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
    },
    {
      name: "Latemar",
      link: "https://code.s3.yandex.net/web-code/latemar.jpg",
    },
    {
      name: "Vanoise National Park",
      link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
    },
    {
      name: "Lago di Braies",
      link: "https://code.s3.yandex.net/web-code/lago.jpg",
    },
  ];

  initialCards.forEach((card) =>
    gallery.append(createCard(card.name, card.link))
  );
};

const openPopup = (popup) => {
  popup.classList.add("popup_opened");
};

const closePopup = (evt) => {
  const popup = evt.target.closest(".popup");

  popup.classList.remove("popup_opened");
  removeClosePopupListeners(popup);
};

const createNewCard = () => {
  gallery.prepend(createCard(imageTitleInput.value, imageLinkInput.value));
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
  setClosePopupListeners(editUserPopup);
  openPopup(editUserPopup);
};

const handleAddImagePopup = () => {
  setClosePopupListeners(addImagePopup);
  openPopup(addImagePopup);
};

const handleEditUserSubmit = (evt) => {
  evt.preventDefault();
  updateUserProfile();
  closePopup(evt);
};

const handleAddImageSubmit = (evt) => {
  evt.preventDefault();
  createNewCard();
  closePopup(evt);
};

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_liked");
};

const handleDeleteCard = (evt) => {
  evt.target.parentElement.remove();
};

const handleOpenImagePopup = (evt) => {
  fullImage.setAttribute("src", evt.target.style.backgroundImage.slice(5, -2));
  imageCaption.textContent =
    evt.target.nextElementSibling.firstElementChild.textContent;

  setClosePopupListeners(imagePopup);
  openPopup(imagePopup);
};

const addCloseButtonListeners = () => {
  Array.from(closePopupButtons).forEach((button) =>
    button.addEventListener("click", (evt) => closePopup(evt))
  );
};

const verifyEscapeKeyPressed = (key) => key === "Escape";

const handleFormKeyPress = (evt) => {
  if (verifyEscapeKeyPressed(evt.key)) {
    closePopup(evt);
  }
};

const handlePopupClick = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt);
  }
};

const handleCloseButtonClick = (evt) => {
  closePopup(evt);
};

const setClosePopupListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");
  const wrapper = popup.querySelector(".popup__wrapper");

  closeButton.addEventListener("click", handleCloseButtonClick);
  wrapper.addEventListener("keydown", handleFormKeyPress);
  popup.addEventListener("click", handlePopupClick);
};

const removeClosePopupListeners = (popup) => {
  const closeButton = popup.querySelector(".popup__close");
  const wrapper = popup.querySelector(".popup__wrapper");

  closeButton.removeEventListener("click", handleCloseButtonClick);
  wrapper.removeEventListener("keydown", handleFormKeyPress);
  popup.removeEventListener("click", handlePopupClick);
};

// Function Invocations

createInitialCards();
setUserText();

editButton.addEventListener("click", handleOpenEditPopup);
addButton.addEventListener("click", handleAddImagePopup);
editUserPopup.addEventListener("submit", handleEditUserSubmit);
addImagePopup.addEventListener("submit", handleAddImageSubmit);
