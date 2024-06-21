import { SymptomDevice } from './SymptomDevice';

export type Symptom = {
  Description?: string | null;
  Device: SymptomDevice[] | any[];
  id: string;
  Name?: string | null;
};
