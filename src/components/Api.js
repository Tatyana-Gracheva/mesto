export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, 
      {
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) 
          {return res.json()}
        Promise.reject(`Произошла ошибка: ${res.status}`)
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
        if (res.ok) 
          {return res.json()}
        Promise.reject(`Произошла ошибка ${res.status}`)
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
        if (res.ok) 
          {return res.json()}
        Promise.reject(`Произошла ошибка ${res.status}`)
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
        if (res.ok) 
          {return res.json()}
        Promise.reject(`Произошла ошибка ${res.status}`)
      })
  }

  addLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, 
    {
      method: "PUT",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) 
        {return res.json()}
      Promise.reject(`Произошла ошибка ${res.status}`)
    })
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, 
    {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) 
        {return res.json()}
      Promise.reject(`Произошла ошибка ${res.status}`)
    })
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, 
    {
      method: "DELETE",
      headers: this._headers,
    })
    .then((res) => {
      if (res.ok) 
        {return res.json()}
      Promise.reject(`Произошла ошибка ${res.status}`)
    })
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, 
      {
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) 
          {return res.json()}
        Promise.reject(`Произошла ошибка ${res.status}`)
      })
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
  headers: {
    authorization: '5457ecbb-4a90-45eb-b193-22d44c85f716',
    'Content-Type': 'application/json'
  }
}); 