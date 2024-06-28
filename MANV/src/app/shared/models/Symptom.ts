import { Device } from './Device';
import { SymptomDevice } from './SymptomDevice';

export type Symptom = {
  Description?: string | null;
  Device: SymptomDevice[];
  id: string;
  Name?: string | null;
};
