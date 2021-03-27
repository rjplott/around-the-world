const openPopup = (popup) => {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEscape);
};

const closePopup = (popup) => {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
};

const verifyEscapeKeyPressed = (key) => key === "Escape";

const closeByEscape = (evt) => {
  if (verifyEscapeKeyPressed(evt.key)) {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
};

export { openPopup, closePopup };
