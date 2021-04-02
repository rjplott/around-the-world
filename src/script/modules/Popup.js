import { verifyEscapeKeyPressed } from "../utils/utils.js";

export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
  }

  open() {
    this._element.classList.add("popup_opened");
    this._handleEscClose = this._handleEscClose.bind(this);
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (verifyEscapeKeyPressed(evt.key)) {
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
