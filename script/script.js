let userProfile = document.querySelector(".profile");
let popup = document.querySelector(".popup");
let editButton = userProfile.querySelector(".profile__edit-button");
let closeFormButton = popup.querySelector(".popup__close-button");
let userName = userProfile.querySelector(".profile__user-name");
let userTitle = userProfile.querySelector(".profile__user-title");
let userNameInput = popup.querySelector(".popup__user-information_type_name");
let userTitleInput = popup.querySelector(".popup__user-information_type_title");

// Event Listener Functions
function handleEditProfileClick() {
  setpopupText();
  popup.classList.add("popup_opened");
}

function handleClosepopup() {
  popup.classList.remove("popup_opened");
}

function handleSaveButtonClick(event) {
  event.preventDefault();
  updateUserProfile();
  handleClosepopup();
}

function setpopupText() {
  userNameInput.value = userName.textContent;
  userTitleInput.value = userTitle.textContent;
}

function updateUserProfile() {
  userName.textContent = userNameInput.value;
  userTitle.textContent = userTitleInput.value;
}

editButton.addEventListener("click", handleEditProfileClick);
closeFormButton.addEventListener("click", handleClosepopup);
popup.addEventListener("submit", handleSaveButtonClick);
