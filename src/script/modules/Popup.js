export default class Popup {
  constructor(popupSelector, verifyKeyPressed) {
    this._element = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._verifyKeyPressed = verifyKeyPressed;
  }

  open() {
    this._element.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (this._verifyKeyPressed(evt.key)) {
      this.close();
    }
  }

  setEventListeners() {
    this._element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }

      if (evt.target.classList.contains("popup__close")) {
        this.close();
      }
    });
  }
}
