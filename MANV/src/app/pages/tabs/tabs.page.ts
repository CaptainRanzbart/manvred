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
}
