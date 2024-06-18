import { Injectable } from '@angular/core';
import { AuthenticationStorage } from '@directus/sdk';

@Injectable({
  providedIn: 'root',
})
export class localStorageService implements AuthenticationStorage {
  constructor() {}
  async get() {
    var res: string = (await localStorage.getItem('directus-data')) || '{}';
    return JSON.parse(res);
  }

  async set(data: any): Promise<void> {
    await localStorage.setItem('directus-data', JSON.stringify(data));
  }
  public async remove(key: string): Promise<any> {
    console.log('Removing from local Storage');
    await localStorage.removeItem(key);
    return true;
  }
}
