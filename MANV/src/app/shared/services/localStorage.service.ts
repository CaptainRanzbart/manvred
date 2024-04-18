import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class localStorageService {
  constructor() {}
  public set(obj: any, key: string) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
  public get(key: string): any {
    var res: string = localStorage.getItem(key) || '{}';
    return JSON.parse(res);
  }
}
