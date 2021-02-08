let userProfile = document.querySelector(".profile");
let editForm = document.querySelector(".edit-form");
let editButton = userProfile.querySelector(".profile__edit-button");
let closeFormButton = editForm.querySelector(".edit-form__close-button");
let saveButton = editForm.querySelector(".edit-form__submit");
let userName = userProfile.querySelector(".profile__user-name");
let userTitle = userProfile.querySelector(".profile__user-title");
let userNameInput = editForm.querySelector(
  ".edit-form__user-information_type_name"
);
let userTitleInput = editForm.querySelector(
  ".edit-form__user-information_type_title"
);

// Event Listener Functions
function handleEditProfileClick() {
  setEditFormText();
  editForm.classList.add("edit-form_opened");
}

function handleCloseEditFormClick(event) {
  event.preventDefault();
  editForm.classList.remove("edit-form_opened");
}

function handleSaveButtonClick(event) {
  event.preventDefault();
  updateUserProfile();
  editForm.classList.remove("edit-form_opened");
}

function setEditFormText() {
  userNameInput.value = userName.textContent;
  userTitleInput.value = userTitle.textContent;
}

function updateUserProfile() {
  userName.textContent = userNameInput.value;
  userTitle.textContent = userTitleInput.value;
}

editButton.addEventListener("click", handleEditProfileClick);
closeFormButton.addEventListener("click", handleCloseEditFormClick);
saveButton.addEventListener("click", handleSaveButtonClick);
