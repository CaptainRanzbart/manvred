import { Injectable, OnInit } from '@angular/core';
import { DirectusService } from './directus.service';
import { AuthenticationClient, AuthenticationData } from '@directus/sdk';
import { NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authClient: AuthenticationClient<any>;

  constructor(
    private directusService: DirectusService,
    private navCtrl: NavController,
  ) {
    this.authClient = <AuthenticationClient<any>> <unknown> this.directusService.getClient()
  }

  public async login(email: string, password: string){
    const authData: AuthenticationData = await this.authClient.login(email, password);
    this.navCtrl.navigateRoot("")
  }

  public async isAuthenticated(): Promise<boolean> {
    const authData: string | null = await this.authClient.getToken();
    if (authData === null) return false

    return authData != null
  }

  public async logout() {
    await this.authClient.logout();
    this.navCtrl.navigateRoot("/login")
  }
}
