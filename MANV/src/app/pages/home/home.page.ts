import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ApiService } from 'src/app/shared/services/api.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;

  message = 'Untersuchung:';
  name: string = '';
  names: string[] = [];

  constructor(private apiServ: ApiService) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.names.push(ev.detail.data!);
      this.message = `Untersuchungen: `;
      this.name = '';
      this.saveNames();
    }
  }
  removeName(index: number) {
    this.names.splice(index, 1);
    this.saveNames();
  }

  ngOnInit() {
    this.loadNames();
  }
  saveNames() {
    localStorage.setItem('names', JSON.stringify(this.names));
  }
  loadNames() {
    const storedNames = localStorage.getItem('names');
    if (storedNames) {
      this.names = JSON.parse(storedNames);
    }
  }
}
