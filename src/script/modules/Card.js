export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleClickLikeButton
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner._id;
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleClickLikeButton = handleClickLikeButton;
  }

  _handleClickLikeButton(evt) {
    evt.target.classList.toggle("card__like-button_liked");
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  _addEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleClickLikeButton(this);
      });

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteClick(this);
      });
  }

  generateCard(currentUser) {
    this._element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._addEventListeners();

    this._element.querySelector(
      ".card__image"
    ).style.backgroundImage = `url("${this._link}")`;
    this._element.querySelector(".card__label").textContent = this._name;
    this._element.querySelector(
      ".card__likes"
    ).textContent = this._likes.length;

    if (this._owner !== currentUser) {
      this._element.querySelector(".card__delete-button").remove();
    }

    if (this._checkIfLiked(currentUser)) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_liked");
    }

    return this._element;
  }

  _checkIfLiked(user) {
    if (this._likes.find((like) => like._id === user)) {
      this._liked = true;
    } else {
      this._liked = false;
    }

    return this._liked;
  }

  getId() {
    return this._id;
  }

  getLiked() {
    return this._liked;
  }

  _addLike() {
    this._liked = true;

    this._element
      .querySelector(".card__like-button")
      .classList.add("card__like-button_liked");
  }

  _removeLike() {
    this._liked = false;

    this._element
      .querySelector(".card__like-button")
      .classList.remove("card__like-button_liked");
  }

  updateCard(data, user) {
    this._likes = data.likes;

    if (this._checkIfLiked(user.id)) {
      this._addLike();
    } else {
      this._removeLike();
    }

    this._element.querySelector(
      ".card__likes"
    ).textContent = this._likes.length;
  }
}
