import { checkAuth, refresh } from './ducks/auth/thunk';
import { ErrorResponse, isSuccessResponse, Response } from "./types/response";
import { ITodo } from './types/todo';

export interface Tokens {
  accessToken?: string,
  refreshToken?: string
}

class Api {
  accessToken = localStorage.getItem('access') || undefined;
  refreshToken = localStorage.getItem('refresh') || undefined;

  async fetch(url: string, config?: RequestInit) {
    return fetch(url, {
      ...config,
      headers: {
        ...config?.headers,
        'content-type': 'application/json',
        authorization: `Bearer ${this.accessToken}`
      }
    }).then(res => res.json())
  }

  async getTodos(): Promise<Response<ITodo[]>> {
    const response = await this.fetch('http://localhost:3142/todos')

    return response;
  };

  async CreateTodo(title: string): Promise<Response<ITodo>> {
    const response = await this.fetch(
      'http://localhost:3142/todos',
      {
        method: "POST",
        body: JSON.stringify({ title })
      }
    )

    return response;
  };

  async login(body: {login: string, password: string}) {
    const data: Response<Tokens> = await fetch(
      'http://localhost:3142/auth/login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(body)
      }
    ).then(res => res.json())
    
    if (isSuccessResponse(data)) {
      this.setTokens(data.data)
    }

    return data;
  }

  async refresh() {

    if (!this.refresh) {
      return { success: false } as ErrorResponse;
    }

    const data: Response<{  accessToken: string, refreshToken: string }> = await fetch(
      'http://localhost:3142/auth/refresh',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          refresh
        })
      }
    ).then(res => res.json())
    
    return data;
  }
  
  async checkAuth() {
    if (!this.accessToken) {
      return false;
    }

    const data: Response<{ success: boolean }> = await fetch(
      'http://localhost:3142/auth/check',
      {
        headers: {
          authorization: `Bearer ${this.accessToken}`
        },
      }
    ).then(res => res.json())

    if (!data.success) {
      const refreshResult = await this.refresh()

      if (isSuccessResponse(refreshResult)) {
        return true;
      }
    }
    
    return data.success;
  }

  async logOut() {
    const data: Response<{ success: boolean }> = await fetch(
      'http://localhost:3142/auth/logout',
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.accessToken}`
        },
      }
    ).then(res => res.json())
    
    return data.success;
  }
  

  private setTokens(tokens: Tokens) {
    this.accessToken = tokens.accessToken;
    this.refreshToken = tokens.refreshToken;
  
    if (tokens.accessToken) {
      localStorage.setItem('access', tokens.accessToken)
    } else {
      localStorage.removeItem('access')
    }

    if (tokens.refreshToken) {
      localStorage.setItem('refresh', tokens.refreshToken)
    } else {
      localStorage.removeItem('refresh')
    }
  }
}

export const api = new Api()