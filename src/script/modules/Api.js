export default class Api {
  constructor(options) {
    this._baseURL = options.baseURL;
    this._headers = options.headers;
  }

  getUserInformation() {
    return fetch(`${this._baseURL}/users/me`, { headers: this._headers })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, { headers: this._headers })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  updateUserInformation(userInfo) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userInfo),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  addCard(cardData) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(cardData),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  addLike(id, userData) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
      method: "PUT",
      body: JSON.stringify(userData),
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  removeLike(id) {
    return fetch(`${this._baseURL}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }

  updateUserAvartar(userAvatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userAvatar),
    })
      .then((res) =>
        res.ok
          ? res.json()
          : Promise.reject(`Error: ${res.status} - ${res.statusText}`)
      )
      .catch((err) => console.log(err));
  }
}
