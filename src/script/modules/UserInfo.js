import { userName, userTitle } from "../utils/constants.js";

export default class UserInfo {
  constructor({ name, job }) {
    this._name = name;
    this._job = job;
  }

  getUserInfo() {
    return {
      name: this._name,
      job: this._job,
    };
  }

  setUserInfo({ name, job }) {
    this._name = name;
    this._job = job;
    userName.textContent = this._name;
    userTitle.textContent = this._job;
  }
}
