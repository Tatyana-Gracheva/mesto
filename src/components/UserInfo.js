import { profileInfo } from '../utils/constants.js';

export default class UserInfo {
  constructor({name, job}) {
    this._userSelector = name;
    this._infoSelector = job;
    this._profileName = profileInfo.querySelector(this._userSelector);
    this._profileJob = profileInfo.querySelector(this._infoSelector);
  }

  getUserInfo() {
    return {user: this._profileName.textContent, info: this._profileJob.textContent};
  }
  
  setUserInfo({firstValue, secondValue}) {
    this._profileName.textContent = firstValue;
    this._profileJob.textContent = secondValue;
  }
}