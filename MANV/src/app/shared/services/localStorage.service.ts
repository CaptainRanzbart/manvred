import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  constructor() {}
  public async set(obj: any, key: string): Promise<void> {
    console.log('Saving to Local Storage');
    await localStorage.setItem(key, JSON.stringify(obj));
  }
  public async get(key: string): Promise<any> {
    console.log('Retrieving from local Storage');
    var res: string = (await localStorage.getItem(key)) || '{}';
    return JSON.parse(res);
  }
  public async remove(key: string): Promise<any> {
    console.log('Removing from local Storage');
    await localStorage.removeItem(key);
    return true;
  }
}
