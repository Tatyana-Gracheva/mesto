import { profileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({name, job}) {
    this._userSelector = name;
    this._infoSelector = job;
  }

  getUserInfo() {
    this._profileName = profileInfo.querySelector(this._userSelector);
    this._profileJob = profileInfo.querySelector(this._infoSelector);
    return {user: this._profileName, info: this._profileJob};
  }
  
  setUserInfo({firstValue, secondValue}) {
    const userInfoObject = this.getUserInfo();
    userInfoObject.user.textContent = firstValue;
    userInfoObject.info.textContent = secondValue;

  }
}