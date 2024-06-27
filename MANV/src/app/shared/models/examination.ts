import { Device } from './Device';
import { Doctor } from './Doctor';
import { ExaminationResult } from './ExaminationResult';
import { Patient } from './Patient';


export type Examination = {
  id: string;
  Device?: Device | null;
  Doctor?: Doctor | null;
  ExaminationResult?: ExaminationResult | null;
  Patient?: Patient | null;
  StartTime?: Date | null;
};
