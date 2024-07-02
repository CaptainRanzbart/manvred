import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { ApiService } from 'src/app/shared/services/api.service';
import { Device } from 'src/app/shared/models/Device';
import { ExaminationResult } from 'src/app/shared/models/ExaminationResult';
import { SymptomDevice } from 'src/app/shared/models/SymptomDevice';

/**
 * Page component to manage the home page, including barcode scanning, UUID validation, 
 * device loading, and examination creation.
 * 
 * This component uses the Capacitor Barcode Scanner for scanning barcodes, validates 
 * scanned UUIDs, loads devices associated with a UUID, and creates new examinations.
 */

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonModal, { static: true }) modal!: IonModal;
  public isSupported = false;
  public validUUID = false;
  public resultId: string = '';
  public device: string = '';
  public devices: Device[] | any[] = [];
  public barcodes: Barcode[] = [];
  public errors!: Error[];

  constructor(
    private alertController: AlertController,
    private apiServ: ApiService,
    private loadingController: LoadingController
  ) { }

  // Init check if Barcode Scanner is supported for current platform
  async ngOnInit() {
    BarcodeScanner.isSupported().then((result: { supported: boolean }) => {
      this.isSupported = result.supported;
    });
  }

  // Check if provided string is a valid UUID
  private isUUID(uuid: string): boolean {
    if (
      !/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
        uuid
      )
    ) {
      return false;
    }
    return true;
  }


  // Check if provided UUID is valid. Query Devices if UUID is valid.
  public async checkUUID(value: string) {
    this.devices = []
    if (this.isUUID(value)) {

      try {
        this.devices = await this.loadDevices();
        console.log(this.devices)
      } catch (error) {

      }

      this.validUUID = true;
    }
  }

  // Dismiss Modal
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  //Confirm Modal and Create a new Examination
  async confirm() {
    const loadingIndicator = await this.showLoadingIndictator(
      'Erstelle Untersuchung ...'
    );

    try {
      await this.apiServ.createExamination(this.resultId, this.device);
      loadingIndicator.dismiss();
      this.modal.dismiss('confirm');

    } catch (error) {
      loadingIndicator.dismiss();
    }
  }

  // QR Code Scanner scan methode
  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.resultId = barcodes[0].rawValue;
    this.checkUUID(this.resultId)
  }

  // Ask user for permissions to open the camera.
  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  // If Permission is denied create a new alert.
  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  // Try to load Devices.
  async loadDevices(): Promise<Device[]> {
    const loadingIndicator = await this.showLoadingIndictator('Lade Geräte');

    try {
      var result: ExaminationResult = await this.apiServ.getExaminationResult(this.resultId);
      const devices: Device[] = result.Symptom?.Device.map((symptDevice: SymptomDevice) => { return symptDevice.Device_id; }) as Device[]
      loadingIndicator.dismiss();
      return devices;
    } catch (error) {
      loadingIndicator.dismiss();

      return [];
    }
  }

  // Show the loading indicator while fetching data.
  private async showLoadingIndictator(message: string) {
    const loadingIndicator = await this.loadingController.create({
      message: message,
    });
    await loadingIndicator.present();
    return loadingIndicator;
  }
}
