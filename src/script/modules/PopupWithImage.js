import Popup from "./Popup.js";
import { fullImage, imageCaption } from "../utils/constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open({ url, text }) {
    fullImage.setAttribute("src", url);
    imageCaption.textContent = text;
    super.open();
  }
}
