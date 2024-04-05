import { Injectable } from '@angular/core';
import { createDirectus, rest } from '@directus/sdk';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseApiUrl;
  client = createDirectus(this.baseUrl).with(rest());

  constructor() {}
}
