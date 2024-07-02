import { Component, OnInit, inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/shared/services/auth.service';

/**
 * Page component to manage the login functionality of the application.
 * 
 * This component handles user authentication by accepting a username and password,
 * displaying a loading indicator during the login process, and handling login errors.
 */

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  private authService = inject(AuthService);
  private loadingController = inject(LoadingController);

  public errors: Error[] = [];

  constructor() { }

  userName: string = '';
  password: string = '';

  async login() {
    // Display loading indicator while Auth Connect login window is open
    const loadingIndicator = await this.showLoadingIndictator();
    try {
      var res = await this.authService.login(this.userName, this.password);
    } catch (e: any) {
      const errors: { errors: Error[] } = e;
      this.errors = errors.errors

    } finally {
      loadingIndicator.dismiss();
    }
  }

  private async showLoadingIndictator() {
    const loadingIndicator = await this.loadingController.create({
      message: 'Logging In...',
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
