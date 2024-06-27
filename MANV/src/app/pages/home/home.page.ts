import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from 'src/app/shared/services/api.service';
import { Device } from 'src/app/shared/models/Device';
import { ExaminationResult } from 'src/app/shared/models/ExaminationResult';
import { SymptomDevice } from 'src/app/shared/models/SymptomDevice';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;
  isSupported = false;
  validUUID = false;
  resultId: string = '';
  device: string = '';
  devices: Device[] | any[] = [];
  barcodes: Barcode[] = [];

  constructor(
    private alertController: AlertController,
    private apiServ: ApiService,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    BarcodeScanner.isSupported().then((result: { supported: boolean }) => {
      this.isSupported = result.supported;
    });
  }
  isUUID(uuid: string): boolean {
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        uuid
      )
    ) {
      return false;
    }
    return true;
  }
  async checkUUID(e: any) {
    if (this.isUUID(e.detail.value)) {
      await this.loadDevices();
      this.validUUID = true;
    }
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  async confirm() {
    const loadingIndicator = await this.showLoadingIndictator(
      'Erstelle Untersuchung ...'
    );
    await this.apiServ.createExamination(this.resultId, this.device);
    loadingIndicator.dismiss();
    this.modal.dismiss('confirm');
  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.resultId = this.barcodes[0].rawValue;
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
  async loadDevices() {
    const loadingIndicator = await this.showLoadingIndictator('Lade Geräte');
    var result: ExaminationResult = await this.apiServ.getExaminationResult(
      this.resultId
    );
    this.devices =
      result.Symptom?.Device.map((symptDevice: SymptomDevice) => {
        return symptDevice.Device_id;
      }) || [];
    loadingIndicator.dismiss();
  }

  private async showLoadingIndictator(message: string) {
    const loadingIndicator = await this.loadingController.create({
      message: message,
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
