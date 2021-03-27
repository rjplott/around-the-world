import { openPopup } from "./utils.js";

const imagePopup = document.querySelector(".popup_purpose_view-full-picture");
const imageContainer = imagePopup.querySelector(".popup__full-image-container");
const fullImage = imageContainer.querySelector(".popup__full-image");
const imageCaption = imageContainer.querySelector(".popup__image-caption");

export default class Card {
  constructor(data, templateSelector) {
    this._description = data.description;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _handleClickLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_liked");
  }

  _handleOpenImagePopup(evt) {
    fullImage.setAttribute(
      "src",
      evt.target.style.backgroundImage.slice(5, -2)
    );
    imageCaption.textContent =
      evt.target.nextElementSibling.firstElementChild.textContent;
    openPopup(imagePopup);
  }

  _handleDeleteCard(evt) {
    evt.target.parentElement.remove();
  }

  _addEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => {
        this._handleClickLikeButton(evt);
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", (evt) => {
        this._handleOpenImagePopup(evt);
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => {
        this._handleDeleteCard(evt);
      });
  }

  generateCard() {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._addEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url("${this._link}")`;
    this._element.querySelector(".card__label").textContent = this._description;

    return this._element;
  }
}
