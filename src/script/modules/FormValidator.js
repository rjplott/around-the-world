export default class FormValidator {
  constructor(settings, formElement) {
    this._formElement = formElement;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._submitButton = this._formElement.querySelector(
      this._submitButtonSelector
    );
  }

  _hasInvalidInput() {
    return this._inputs.some((input) => {
      return !input.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.deactivateSaveButton();
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute("disabled");
    }
  }

  _hideInputError(input) {
    const errorSpan = this._formElement.querySelector(`.${input.id}-error`);
    errorSpan.textContent = "";
    errorSpan.classList.remove(this._errorClass);
    input.classList.remove(this._inputErrorClass);
  }

  _showInputError(input, error) {
    const errorSpan = this._formElement.querySelector(`.${input.id}-error`);
    errorSpan.textContent = error;
    errorSpan.classList.add(this._errorClass);
    input.classList.add(this._inputErrorClass);
  }

  _checkInputValidity(input) {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input, input.validationMessage);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();

    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    this._inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  deactivateSaveButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", "");
  }

  enableValidation() {
    this._inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );

    this._setEventListeners();
  }

  resetValidation() {
    this._inputs.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });

    this._toggleButtonState();
  }
}
