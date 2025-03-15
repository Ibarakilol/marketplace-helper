import { makeAutoObservable } from 'mobx';

import { APP_LOCALSTORAGE_JWT } from '@/constants';

class GlobalAppStore {
  init() {
    this.checkToken();
  }

  token: string = localStorage.getItem(APP_LOCALSTORAGE_JWT) || '';

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  setToken(token: string) {
    this.token = token;

    if (token) {
      localStorage.setItem(APP_LOCALSTORAGE_JWT, token);
    }
  }

  removeToken() {
    localStorage.removeItem(APP_LOCALSTORAGE_JWT);
    this.setToken('');
  }

  checkToken() {
    const TOKEN = import.meta.env.VITE_APP_JWT_TOKEN;

    if (TOKEN && this.token !== TOKEN) {
      localStorage.setItem(APP_LOCALSTORAGE_JWT, TOKEN);
      this.setToken(TOKEN);
    }
  }
}

export default new GlobalAppStore();
