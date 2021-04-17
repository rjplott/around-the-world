import { userName, userTitle, profilePicture } from "../utils/constants.js";

export default class UserInfo {
  constructor(data) {
    this._name = data.name;
    this._about = data.about;
    this._id = data._id;
    this._data = data;
    this._avatar = data.avatar;
  }

  getUserInfo() {
    return {
      name: this._name,
      about: this._about,
      id: this._id,
      avatar: this._avatar,
    };
  }

  getUserData() {
    return this._data;
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._name = name;
    this._about = about;
    this._id = _id;
    this._avatar = avatar;
    userName.textContent = this._name;
    userTitle.textContent = this._about;
    profilePicture.setAttribute("src", this._avatar);
  }
}
