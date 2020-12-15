import { profileInfo, popupOpenButtonEditAvatar } from '../utils/constants.js';

export default class UserInfo {
  constructor({name, job, avatar}) {
    this._userSelector = name;
    this._infoSelector = job;
    this._avatarSelector = avatar;
    this._profileName = profileInfo.querySelector(this._userSelector);
    this._profileJob = profileInfo.querySelector(this._infoSelector);
    this._profileAvatar = profileInfo.querySelector(this._avatarSelector);
  }

  getUserInfo() {
    return {firstValue: this._profileName.textContent, secondValue: this._profileJob.textContent};
  }
  
  setUserInfo({firstValue, secondValue}) {
    this._profileName.textContent = firstValue;
    this._profileJob.textContent = secondValue;
  }

  setUserAvatar(avatar) {
    this._profileAvatar.src = avatar;
  }

  setEventListeners() {
    this._profileAvatar.addEventListener('mouseover', () => {
      popupOpenButtonEditAvatar.classList.toggle('profile-info_changed-avatar');
      this._profileAvatar.style.opacity = '0.5';

    })
    this._profileAvatar.addEventListener('mouseout', () => {
      popupOpenButtonEditAvatar.classList.toggle('profile-info_changed-avatar');
      this._profileAvatar.style.opacity = '1';
    })
  }
}

