export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._description = data.description;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _handleClickLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_liked");
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
        this._handleCardClick(evt);
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
