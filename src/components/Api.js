export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

_getResPromise(resPromise) {
  if (resPromise.ok) 
    {
      return resPromise.json()}
  Promise.reject(`Произошла ошибка: ${resPromise.status}`)
}

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, 
      {
        headers: this._headers
      })
      .then((res) => {
        return this._getResPromise(res)
        
      })
  }

  changeUserInfo(userNameAbout) {
    return fetch(`${this._baseUrl}/users/me`, 
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userNameAbout.name,
          about: userNameAbout.about
        })
      })
      .then((res) => {
        return this._getResPromise(res);
      })
  }

  changeAvatar(urlAvatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, 
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: urlAvatar,
        })
      })
      .then((res) => {
        return this._getResPromise(res);
      })
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, 
      {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then((res) => {
        return this._getResPromise(res);
      })
  }

  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, 
    {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) => {
      return this._getResPromise(res);
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, 
    {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      return this._getResPromise(res);
    })
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, 
    {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      return this._getResPromise(res);
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, 
      {
        headers: this._headers
      })
      .then((res) => { 
        return this._getResPromise(res);
      })
  }
}


