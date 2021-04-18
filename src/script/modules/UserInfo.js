export default class UserInfo {
  constructor(nameElement, titleElement, pictureElement) {
    this._nameElement = nameElement;
    this._titleElement = titleElement;
    this._pictureElement = pictureElement;
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
    this._nameElement.textContent = this._name;
    this._titleElement.textContent = this._about;
    this._pictureElement.setAttribute("src", this._avatar);
  }
}
