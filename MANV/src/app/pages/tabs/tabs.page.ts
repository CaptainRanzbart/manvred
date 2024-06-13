import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor(private authServ: AuthService) {}
  async logout() {
    console.log('Logging Out ...');
    await this.authServ.logout();
  }
  public alertButtons = [
    {
      text: 'Nein',
      cssClass: 'alert-button-cancel',
    },
    {
      text: 'Ja',
      cssClass: 'alert-button-confirm',
      handler: async () => {
        console.log('Logging Out ...');
        await this.authServ.logout();
      }
    },
];
}
