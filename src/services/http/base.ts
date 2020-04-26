import { SessionService } from '..'
import axios, { AxiosRequestConfig, Method } from 'axios';

export abstract class BaseService {
  private apiUrl = process.env.REACT_APP_BLOCKMMP_API_URL

  protected async get(segment: string, data?: any): Promise<any> {
    return this.fetch(segment, 'GET', data)
  }

  protected async post(segment: string, data: any): Promise<any> {
    return this.fetch(segment, 'GET', data)
  }

  protected async patch(segment: string, data: any): Promise<any> {
    return this.fetch(segment, 'PATCH', data)
  }

  protected async delete(segment: string): Promise<any> {
    return this.fetch(segment, 'DELETE')
  }

  protected async put<T = any>(segment: string, data?: any, token?: string): Promise<T> {
    return this.fetch(segment, 'PUT', data, token)
  }

  private async fetch(segment: string, method: string, data?: any, token?: string): Promise<any> {
    const url = `/api/${segment}`
    const options: AxiosRequestConfig = {
      method: method as Method,
      headers: this.headers(token),
      data: !data ? undefined : JSON.stringify(data),
      url
    }
    try {
      const response = await axios(options)
      return response.data
    } catch (error) {
      console.log("---Error ocurred----")
    }
  }

  private async handleResponse(response: Response): Promise<any> {
    return response.json()
  }

  private headers(token = SessionService.token): any {
    console.log(token);
    const headers: { [key: string]: string } = {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }

    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  }
}
