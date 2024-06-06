import { Device } from "./Device";
import { ExaminationResult } from "./ExaminationResult";
import { Patient } from "./Patient";

  export type Examination = {
    Device?: string | Device | null;
    Doctor?: string | null;
    ExaminationResult?: string | ExaminationResult | null;
    id: string;
    Patient?: string | Patient | null;
    StartTime?: string | null;
  };
  

