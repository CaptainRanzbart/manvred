import { Injectable } from '@angular/core';
import {
  authentication,
  AuthenticationData,
  createDirectus,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseApiUrl;
  client = createDirectus(this.baseUrl).with(authentication());
  constructor() {}

  public login(user: string, password: string): Promise<AuthenticationData> {
    return this.client.login(user, password);
  }

  public logout(): Promise<void> {
    return this.client.logout();
  }

  public refresh(): Promise<AuthenticationData> {
    return this.client.refresh();
  }
}
