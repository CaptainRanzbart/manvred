import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { AlertController, ModalController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;
  isSupported = false;
  name: string = '';
  names: string[] = [];
  device: string = '';
  devices: string[] = [];
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private apiServ: ApiService
  ) {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss({ name: this.name, device: this.device }, 'confirm');
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.apiServ.createExamination(this.barcodes[0].rawValue, this.device);
  }
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<
      OverlayEventDetail<{ name: string; device: string }>
    >;
    if (ev.detail.role === 'confirm') {
      const { name, device } = ev.detail.data!;
      this.names.push(name);
      this.devices.push(device);
      this.name = '';
      this.device = '';
      this.saveNames();
      this.saveDevices();
    }
  }

  removeName(index: number) {
    this.names.splice(index, 1);
    this.devices.splice(index, 1);
    this.saveNames();
    this.saveDevices();
  }

  ngOnInit() {
    this.loadNames();
    this.loadDevices();
    BarcodeScanner.isSupported().then((result: { supported: boolean }) => {
      this.isSupported = result.supported;
    });
  }

  saveNames() {
    localStorage.setItem('names', JSON.stringify(this.names));
  }

  saveDevices() {
    localStorage.setItem('devices', JSON.stringify(this.devices));
  }

  loadNames() {
    const storedNames = localStorage.getItem('names');
    if (storedNames) {
      this.names = JSON.parse(storedNames);
    }
  }

  loadDevices() {
    const storedDevices = localStorage.getItem('devices');
    if (storedDevices) {
      this.devices = JSON.parse(storedDevices);
    }
  }
}
