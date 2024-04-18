import { Injectable } from '@angular/core';
import {
  authentication,
  AuthenticationData,
  createDirectus,
  rest,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseApiUrl;
  client = createDirectus(this.baseUrl)
    .with(authentication('json'))
    .with(rest());
  constructor() {}

  public async login(
    user: string,
    password: string
  ): Promise<AuthenticationData> {
    return this.client.login(user, password);
  }

  public async logout(): Promise<void> {
    return await this.client.logout();
  }

  public async refresh(): Promise<AuthenticationData> {
    return await this.client.refresh();
  }
}
