import { Symptom } from "./Symptom";
import { Patient } from "./Patient";


export type ExaminationResult = {
    Bodypart?: string | null;
    id: string;
    Patient?: string | Patient | null;
    Recognized?: boolean | null;
    Symptom?: number | Symptom | null;
};
