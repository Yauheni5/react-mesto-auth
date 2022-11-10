import { optionsApi } from "./constants";


class Api {
  constructor(options) {
    this.url = options.url;
    this._headers = options.headers;
  }

  _checkResponseError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfoApi() {
    return fetch(`${this.url}/users/me`, {
        method: 'GET',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then(this._checkResponseError)
  }

  setUserInfoApi(userData) {
    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: userData.name,
          about: userData.about
        })
      })
      .then(this._checkResponseError)
  }

  setUserAvatarApi(userData) {
    return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: userData.avatar
        })
      })
      .then(this._checkResponseError)
  }

  addCard(data) {
    return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.name,
          link: data.link
        })
      })
      .then(this._checkResponseError)
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }

  handleToggleLikeApi(cardId, isLiked) {
    return fetch(`${this.url}/cards/${cardId}/likes`, {
        method: `${isLiked ? "DELETE" : "PUT"}`,
        headers: this._headers,
      })
      .then(this._checkResponseError)
  }
  getAllPromise() {
    return Promise.all([this.getUserInfoApi(), this.getInitialCards()])
  }
}

export const api = new Api(optionsApi);
