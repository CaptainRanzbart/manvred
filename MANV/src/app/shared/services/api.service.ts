import { Injectable } from '@angular/core';
import {
  AuthenticationClient,
  DirectusClient,
  readItems,
  rest,
  RestClient,
  withToken,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { DirectusService } from './directus.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseApiUrl;
  restClient = <RestClient<any>>(<unknown>this.directusService.getClient());

  constructor(private directusService: DirectusService) {}
}
