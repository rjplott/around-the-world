const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const enableValidation = (config) => {
  const forms = Array.from(document.querySelectorAll(config.formSelector));
  forms.forEach((form) => {
    form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    const inputs = Array.from(form.querySelectorAll(config.inputSelector));
    setEventListeners(form, inputs);
  });
};

const setEventListeners = (form, inputs) => {
  const submitButton = form.querySelector(config.submitButtonSelector);
  toggleButtonState(inputs, submitButton);

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(form, input);
      toggleButtonState(inputs, submitButton);
    });
  });
};

const checkInputValidity = (form, input) => {
  if (input.validity.valid) {
    hideInputError(form, input);
  } else {
    showInputError(form, input, input.validationMessage);
  }
};

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.classList.remove(config.inactiveButtonClass);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const showInputError = (form, input, error) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.textContent = error;
  errorSpan.classList.add(config.errorClass);
  input.classList.add(config.inputErrorClass);
};

const hideInputError = (form, input) => {
  const errorSpan = form.querySelector(`.${input.id}-error`);
  errorSpan.textContent = "";
  errorSpan.classList.remove(config.errorClass);
  input.classList.remove(config.inputErrorClass);
};

enableValidation(config);
