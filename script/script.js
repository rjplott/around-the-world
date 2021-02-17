const userProfile = document.querySelector(".profile");
const addImagePopup = document.querySelector(".popup_purpose_add-picture");
const editUserPopup = document.querySelector(".popup_purpose_edit-user");
const cardTemplate = document.querySelector("#card-template");
const gallery = document.querySelector(".gallery");

const userName = userProfile.querySelector(".profile__user-name");
const userTitle = userProfile.querySelector(".profile__user-title");
const editButton = userProfile.querySelector(".profile__edit-button");
const addButton = userProfile.querySelector(".profile__add-image-button");

const closePopupButtons = document.querySelectorAll(".popup__close-button");

const userNameInput = editUserPopup.querySelector(
  ".popup__text-input_type_name"
);
const userTitleInput = editUserPopup.querySelector(
  ".popup__text-input_type_title"
);

// Create function to initialize our default cards
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

  initialCards.forEach((card) => createCard(card));
};

// Create function to create a card; should take a card object
const createCard = (card) => {
  const newCard = cardTemplate.content.querySelector(".card").cloneNode(true);

  newCard.querySelector(
    ".card__image"
  ).style.backgroundImage = `url("${card.link}")`;
  newCard.querySelector(".card__label").textContent = card.name;
  gallery.append(newCard);
};

// Event Listener Functions
const openPopup = (popup) => {
  setUserText();
  popup.classList.add("popup_opened");
};

const closePopup = (evt) => {
  console.dir(evt.target);
  evt.target.closest(".popup").classList.remove("popup_opened");
};

const saveButtonClick = (updateFunction) => {
  updateFunction();
  closePopup();
};

const setUserText = () => {
  userNameInput.value = userName.textContent;
  userTitleInput.value = userTitle.textContent;
};

const updateUserProfile = () => {
  userName.textContent = userNameInput.value;
  userTitle.textContent = userTitleInput.value;
};

createInitialCards();

editButton.addEventListener("click", () => {
  openPopup(editUserPopup);
});

addButton.addEventListener("click", () => {
  openPopup(addImagePopup);
});

Array.from(closePopupButtons).forEach((button) =>
  button.addEventListener("click", closePopup)
);

editUserPopup.addEventListener("submit", (evt) => {
  evt.preventDefault();
  saveButtonClick(evt.currentTarget, updateUserProfile);
});
