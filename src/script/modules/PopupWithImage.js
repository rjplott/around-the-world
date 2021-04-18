import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector, verifyKeyPressed, imageElement, captionElement) {
    super(popupSelector, verifyKeyPressed);
    this._image = imageElement;
    this._caption = captionElement;
  }

  open({ url, text }) {
    this._image.setAttribute("src", url);
    this._caption.textContent = text;
    super.open();
  }
}
