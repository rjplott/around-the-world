import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    const inputElements = this._element.querySelectorAll(".popup__input");
    this._inputs = Array.from(inputElements);
  }

  setEventListeners() {
    this._element.addEventListener("submit", () => {
      this._submitHandler();
    });

    super.setEventListeners();
  }

  close(handleReset) {
    super.close();

    if (handleReset) {
      handleReset();
    }
  }
}
