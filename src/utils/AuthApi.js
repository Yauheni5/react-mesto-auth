import { optionsAuthApi } from "./constants";

class AuthApi {
  constructor(options) {
    this.url = options.url;
    this._headers = options.headers;
  }

  _checkResponseError = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  registrationUserApi (userRegistrationInfo) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: userRegistrationInfo.email,
        password: userRegistrationInfo.password
      })
    })
    .then(this._checkResponseError)
  }

  authorizationUserApi (userRegistrationInfo) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        email: userRegistrationInfo.email,
        password: userRegistrationInfo.password
      })
    })
    .then(this._checkResponseError)
  }

  checkUserToken (token) {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization" : `Bearer ${token}`
      }
    })
    .then(this._checkResponseError)
  }
}

export const authorizationApi = new AuthApi (optionsAuthApi);
