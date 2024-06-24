import { Device } from './Device';
import { ExaminationResult } from './ExaminationResult';
import { Patient } from './Patient';

export type Examination = {
  Device?: Device | null;
  Doctor?: string | null;
  ExaminationResult?: ExaminationResult | null;
  id: string;
  Patient?: Patient | null;
  StartTime?: Date | null;
};
