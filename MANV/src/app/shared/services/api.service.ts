import { Injectable } from '@angular/core';
import {
  AuthenticationClient,
  createItem,
  DirectusClient,
  DirectusUser,
  readItem,
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

  private _defaultQueryParams: object = { fields: ['*.*.*.*.*'] };

  async createExamination(patientId: string, deviceId: string) {
    var token = (await this.directusService.getToken()) || '';
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

  private async getObject(key: string, id: string, queryParams: object) {
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
