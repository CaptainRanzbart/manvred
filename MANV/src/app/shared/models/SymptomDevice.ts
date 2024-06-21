import { Device } from './Device';
import { Symptom } from './Symptom';

export type SymptomDevice = {
  Device_id?: Device | null;
  id: number;
  Symptom_id?: Symptom | null;
};
