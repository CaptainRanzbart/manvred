import { Injectable } from '@angular/core';
import {
  authentication,
  AuthenticationData,
  createDirectus,
  logout,
  refresh,
  rest,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { localStorageService } from './localStorage.service';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = environment.baseApiUrl;
  client = createDirectus(this.baseUrl)
    .with(authentication('json'))
    .with(rest());
  private tokenStack: AuthenticationData = {
    access_token: null,
    refresh_token: null,
    expires: null,
    expires_at: null,
  };
  constructor(
    private lsServ: localStorageService,

    private navCtrl: NavController
  ) {}

  public async login(
    user: string,
    password: string
  ): Promise<AuthenticationData> {
    var res = await this.client.login(user, password);
    if (res) {
      res.expires_at = new Date().getTime() + (res.expires || 0);
      this.tokenStack = res;
      await this.lsServ.set(res, 'token_stack');
      this.navCtrl.navigateRoot('/home');
    }
    return res;
  }

  public async logout(): Promise<void> {
    //Remove Stored Token Stack and Refresh Application
    await this.lsServ.remove('token_stack');
    this.navCtrl.navigateRoot('/login');
  }

  public async refresh(): Promise<AuthenticationData> {
    //Get Token from localStorage if not loaded
    if (this.tokenStack.access_token == null) {
      await this.getStack();
    }
    //Check if Key is Expired
    if (
      this.tokenStack.expires_at &&
      this.tokenStack.expires_at > new Date().getTime()
    ) {
      //Refresh Token
      var res = await this.client.request(
        refresh('json', this.tokenStack.refresh_token || '')
      );
      //Save Expiredate
      res.expires_at = new Date().getTime() + (res.expires || 0);

      //Save new Tokenstack to localStorage
      this.tokenStack = res;
      await this.lsServ.set(res, 'token_stack');
      return res;
    } else {
      //If Key is Refresh Key is Expired then Route to Login Page
      console.log('Key Expired');
      this.navCtrl.navigateRoot('/login');
      return this.tokenStack;
    }
  }
  public async isAuthenticated(): Promise<any> {
    var res = await this.refresh();
    return res.expires_at && res.expires_at > new Date().getTime();
  }
  private async getStack(): Promise<void> {
    this.tokenStack = await this.lsServ.get('token_stack');
  }
  public async getAuthToken(): Promise<string | null> {
    return (await this.refresh()).access_token;
  }
}
