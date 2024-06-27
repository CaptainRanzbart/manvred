import { Injectable } from '@angular/core';
import {
  createItem,
  DirectusUser,
  readItem,
  readItems,
  readMe,
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

  private _defaultQueryParams: object = { fields: ['*.*.*.*.*'] };

  async createExamination(examinationResultId: string, deviceId: string) {
    var token = (await this.directusService.getToken()) || '';
    var doctor = await this.getCurrentUser();
    var device: Device | any = await this.getObject(
      'Device',
      deviceId,
      this._defaultQueryParams
    );
    var result: ExaminationResult | any = await this.getObject(
      'ExaminationResult',
      examinationResultId,
      this._defaultQueryParams
    );
    var examination: Examination = {
      id: '',
      Device: device,
      Doctor: doctor,
      ExaminationResult: result,
      Patient: result.Patient,
      StartTime: new Date(),
    };
    console.log('Created Examination');
    console.table(examination);
    await this.restClient.request(
      withToken(token, createItem('Examination', examination))
    );
  }
  async getPatients(
    queryParams: object = this._defaultQueryParams
  ): Promise<Patient[] | any> {
    return await this.getObjects('Patient', queryParams);
  }
  async getExaminations(
    queryParams: object = this._defaultQueryParams
  ): Promise<Examination[] | any> {
    return await this.getObjects('Examination', queryParams);
  }
  async getExamination(
    id: string,
    queryParams: object = this._defaultQueryParams
  ): Promise<Examination[] | any> {
    return await this.getObject('Examination', id, queryParams);
  }
  async getRooms(
    queryParams: object = this._defaultQueryParams
  ): Promise<Room[] | any> {
    return await this.getObjects('Room', queryParams);
  }
  async getSymptoms(
    queryParams: object = this._defaultQueryParams
  ): Promise<Symptom[] | any> {
    return await this.getObjects('Symptom', queryParams);
  }
  async getExaminationResult(
    id: string,
    queryParams: object = this._defaultQueryParams
  ): Promise<ExaminationResult[] | any> {
    return await this.getObject('ExaminationResult', id, queryParams);
  }
  async getExaminationResults(
    queryParams: object = this._defaultQueryParams
  ): Promise<ExaminationResult[] | any> {
    return await this.getObjects('ExaminationResult', queryParams);
  }
  async getDevices(
    queryParams: object = this._defaultQueryParams
  ): Promise<Device[] | any> {
    return await this.getObjects('Device', queryParams);
  }

  private async getObjects(key: string, queryParams: object) {
    var token = (await this.directusService.getToken()) || '';
    return this.restClient.request(
      withToken(token, readItems(key, queryParams))
    );
  }

  private async getObject(key: string, id: string, queryParams?: object) {
    var token = (await this.directusService.getToken()) || '';
    return this.restClient.request(
      withToken(token, readItem(key, id, queryParams))
    );
  }

  async getCurrentUser(): Promise<DirectusUser<any> | any | null> {
    var token = (await this.directusService.getToken()) || '';
    return this.restClient.request(withToken(token, readMe()));
  }
}
