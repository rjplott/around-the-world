import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
    this._submitButton = this._element.querySelector(".popup__button");
    this._buttonText = this._submitButton.textContent;
  }

  _getValues() {
    this._inputList = this._element.querySelectorAll(".popup__input");
    this._values = {};

    this._inputList.forEach(
      (input) => (this._values[input.name] = input.value)
    );

    return this._referenceValue || this._values;
  }

  setValue(referenceValue) {
    this._referenceValue = referenceValue;
  }

  setEventListeners() {
    this._element.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._submitButton.textContent = "Saving...";
      this._submitHandler(this._getValues());
    });

    super.setEventListeners();
  }

  close(handleReset) {
    this._submitButton.textContent = this._buttonText;

    super.close();

    if (handleReset) {
      handleReset();
    }
  }
}
