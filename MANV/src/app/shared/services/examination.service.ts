import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Device } from '../models/Device';
import { Patient } from '../models/Patient';
import { Examination } from '../models/Examination';
import { ExaminationResult } from '../models/ExaminationResult';
import { Symptom } from '../models/Symptom';
import { SymptomDevice } from '../models/SymptomDevice';

@Injectable({
  providedIn: 'root',
})
export class ExaminationService {
  constructor(private apiServ: ApiService) {}

  public async createExamnation(device: Device, patientId: string) {
    var doctor = await this.apiServ.getCurrentUser();
    var examResult;

    var patients: Patient[] = await this.apiServ.getPatients();
    var patient = patients.find((x) => x.id == patientId);

    let examinationResults: ExaminationResult[] =
      await this.apiServ.getExaminationResults();

    let symptoms: Symptom[] = await this.apiServ.getSymptoms();

    for await (const result of examinationResults) {
      if (result.Patient?.valueOf == patient?.valueOf) {
        let symptom: Symptom = symptoms.find(
          (s) => s.id == result.Symptom?.id
        ) || { id: '', Device: [] };
        if (
          symptom.Device.filter((x: SymptomDevice) => x.Device_id == device.id)
            .length != 0
        ) {
          examResult = result;
        }
      }
    }

    var examination: Examination = {
      id: '',
      Device: device,
      Patient: patient,
      StartTime: new Date(),
      Doctor: doctor,
      ExaminationResult: examResult,
    };
    return await this.apiServ.createExamination(examination);
  }
}
