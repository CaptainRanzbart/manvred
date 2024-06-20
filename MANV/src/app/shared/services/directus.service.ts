import { Injectable, OnInit } from '@angular/core';
import {
  AuthenticationClient,
  DirectusClient,
  authentication,
  createDirectus,
  rest,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { localStorageService } from './localStorage.service';

@Injectable({
  providedIn: 'root',
})
export class DirectusService {
  private client: AuthenticationClient<any>;

  constructor(private storage: localStorageService) {
    this.client = createDirectus(environment.baseApiUrl)
      .with(authentication('json', { storage }))
      .with(rest());
  }
  public async getToken() {
    return this.client.getToken();
  }
  public getClient() {
    return this.client;
  }
}
