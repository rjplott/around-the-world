const userProfile = document.querySelector(".profile");
const popup = document.querySelector(".popup");
const editButton = userProfile.querySelector(".profile__edit-button");
const closeFormButton = popup.querySelector(".popup__close-button");
const userName = userProfile.querySelector(".profile__user-name");
const userTitle = userProfile.querySelector(".profile__user-title");
const userNameInput = popup.querySelector(".popup__user-information_type_name");
const userTitleInput = popup.querySelector(
  ".popup__user-information_type_title"
);
const cardTemplate = document.querySelector("#card-template");
const gallery = document.querySelector(".gallery");

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
  console.dir(cardTemplate, newCard);

  newCard.querySelector(
    ".card__image"
  ).style.backgroundImage = `url("${card.link}")`;
  newCard.querySelector(".card__label").textContent = card.name;
  gallery.append(newCard);
};

// Event Listener Functions
const handleEditProfileClick = () => {
  setpopupText();
  popup.classList.add("popup_opened");
};

const handleClosepopup = () => {
  popup.classList.remove("popup_opened");
};

const handleSaveButtonClick = (event) => {
  event.preventDefault();
  updateUserProfile();
  handleClosepopup();
};

const setpopupText = () => {
  userNameInput.value = userName.textContent;
  userTitleInput.value = userTitle.textContent;
};

const updateUserProfile = () => {
  userName.textContent = userNameInput.value;
  userTitle.textContent = userTitleInput.value;
};

createInitialCards();
editButton.addEventListener("click", handleEditProfileClick);
closeFormButton.addEventListener("click", handleClosepopup);
popup.addEventListener("submit", handleSaveButtonClick);
