import { Injectable } from '@angular/core';
import {
  AuthenticationClient,
  DirectusClient,
  readItems,
  rest,
  RestClient,
  withToken,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { DirectusService } from './directus.service';
import { Examination } from '../models/Examination';
import { Device } from '../models/Device';
import { Patient } from '../models/Patient';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseApiUrl;
  restClient = <RestClient<any>>(<unknown>this.directusService.getClient());

  constructor(private directusService: DirectusService) {}

  createExamination(device: Device, patient: Patient) {
    var Examination: Examination = {
      Device: device,
      Doctor: null,
      ExaminationResult: null,
      id: 0,
      Patient: patient,
      StartTime: new Date(),
    };
  }
  async getPatients() {
    return await this.getObjects('Patient');
  }
  async getExaminations() {
    return await this.getObjects('Examination');
  }
  async getRooms() {
    return await this.getObjects('Room');
  }
  async getSymptoms() {
    return await this.getObjects('Symptom');
  }
  async getExaminationResults() {
    return await this.getObjects('ExaminationResult');
  }
  async getDevices() {
    return await this.getObjects('Devices');
  }
  private async getObjects(key: string) {
    var token = (await this.directusService.getToken()) || '';
    return this.restClient.request(
      withToken(
        token,
        readItems(key, {
          fields: ['*.*'],
        })
      )
    );
  }
}
