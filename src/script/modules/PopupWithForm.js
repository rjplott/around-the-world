import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._element.querySelectorAll(".popup__input");
    this._formValues = {};

    this._inputList.forEach(
      (input) => (this._formValues[input.name] = input.value)
    );

    return this._formValues;
  }

  setEventListeners() {
    this._element.addEventListener("submit", () => {
      this._submitHandler(this._getInputValues());
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
