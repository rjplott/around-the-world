export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    return res.ok
      ? res.json()
      : Promise.reject(`Error: ${res.status} - ${res.statusText}`);
  }

  getUserInformation() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserInformation(userInfo) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    }).then(this._checkResponse);
  }

  addCard(cardData) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  addLike(id, userData) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(id) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  updateUserAvartar(userAvatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userAvatar),
    }).then(this._checkResponse);
  }
}
