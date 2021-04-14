import { userName, userTitle } from "../utils/constants.js";

export default class UserInfo {
  constructor({ name, about }) {
    this._name = name;
    this._about = about;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
    };
  }

  setUserInfo({ name, about }) {
    this._name = name;
    this._about = about;
    userName.textContent = this._name;
    userTitle.textContent = this._about;
  }
}
