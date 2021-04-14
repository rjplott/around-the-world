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
}
