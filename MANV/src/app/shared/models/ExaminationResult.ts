import { Symptom } from './Symptom';
import { Patient } from './Patient';

export type ExaminationResult = {
  Bodypart?: string | null;
  id: string;
  Patient?: Patient | null;
  Recognized?: boolean | null;
  Symptom?: Symptom;
};
