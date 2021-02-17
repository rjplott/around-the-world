const userProfile = document.querySelector(".profile");
const addImagePopup = document.querySelector(".popup_purpose_add-picture");
const editUserPopup = document.querySelector(".popup_purpose_edit-user");
const cardTemplate = document.querySelector("#card-template");
const gallery = document.querySelector(".gallery");
const closePopupButtons = document.querySelectorAll(".popup__close-button");

const userName = userProfile.querySelector(".profile__user-name");
const userTitle = userProfile.querySelector(".profile__user-title");
const editButton = userProfile.querySelector(".profile__edit-button");
const addButton = userProfile.querySelector(".profile__add-image-button");

const userNameInput = editUserPopup.querySelector(
  ".popup__text-input_type_name"
);
const userTitleInput = editUserPopup.querySelector(
  ".popup__text-input_type_user-title"
);

const imageTitleInput = addImagePopup.querySelector(
  ".popup__text-input_type_image-title"
);
const imageLinkInput = addImagePopup.querySelector(
  ".popup__text-input_type_image-link"
);

const createCard = (name, link) => {
  const newCard = cardTemplate.content.querySelector(".card").cloneNode(true);

  newCard.querySelector(
    ".card__image"
  ).style.backgroundImage = `url("${link}")`;
  newCard.querySelector(".card__label").textContent = name;
  newCard
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeButtonClick);
  newCard
    .querySelector(".card__delete-button")
    .addEventListener("click", handleDeleteCard);
  gallery.append(newCard);
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

  initialCards.forEach((card) => createCard(card.name, card.link));
};

// Update Functions
const openPopup = (popup) => {
  setUserText();
  popup.classList.add("popup_opened");
};

const closePopup = (evt) => {
  evt.target.closest(".popup").classList.remove("popup_opened");
};

const createNewCard = () => {
  createCard(imageTitleInput.value, imageLinkInput.value);
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

const handleLikeButtonClick = (evt) => {
  evt.target.classList.toggle("card__like-button_liked");
};

const handleDeleteCard = (evt) => {
  evt.target.parentElement.remove();
};

createInitialCards();

editButton.addEventListener("click", () => {
  openPopup(editUserPopup);
});

addButton.addEventListener("click", () => {
  openPopup(addImagePopup);
});

Array.from(closePopupButtons).forEach((button) =>
  button.addEventListener("click", (evt) => closePopup(evt))
);

editUserPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateUserProfile();
  closePopup(evt);
});

addImagePopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  createNewCard();
  closePopup(evt);
});
