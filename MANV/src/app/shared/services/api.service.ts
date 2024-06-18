import { Injectable } from '@angular/core';
import {
  AuthenticationClient,
  createItem,
  DirectusClient,
  DirectusUser,
  readItems,
  readMe,
  rest,
  RestClient,
  withToken,
} from '@directus/sdk';
import { environment } from 'src/environments/environment';
import { DirectusService } from './directus.service';
import { Examination } from '../models/Examination';
import { Device } from '../models/Device';
import { Patient } from '../models/Patient';
import { ExaminationResult } from '../models/ExaminationResult';
import { Symptom } from '../models/Symptom';
import { Room } from '../models/Room';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseUrl = environment.baseApiUrl;
  restClient = <RestClient<any>>(<unknown>this.directusService.getClient());

  constructor(private directusService: DirectusService) {}

  async createExamination(examination: Examination) {
    var token = (await this.directusService.getToken()) || '';
    return await this.restClient.request(
      createItem('Examination', examination)
    );
  }
  async getPatients(): Promise<Patient[] | any> {
    return await this.getObjects('Patient');
  }
  async getExaminations(): Promise<Examination[] | any> {
    return await this.getObjects('Examination');
  }
  async getRooms(): Promise<Room[] | any> {
    return await this.getObjects('Room');
  }
  async getSymptoms(): Promise<Symptom[] | any> {
    return await this.getObjects('Symptom');
  }
  async getExaminationResults(): Promise<ExaminationResult[] | any> {
    return await this.getObjects('ExaminationResult');
  }
  async getDevices(): Promise<Device[] | any> {
    return await this.getObjects('Device');
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
  async getCurrentUser(): Promise<DirectusUser<any> | any | null> {
    var token = (await this.directusService.getToken()) || '';
    return this.restClient.request(withToken(token, readMe()));
  }
}
