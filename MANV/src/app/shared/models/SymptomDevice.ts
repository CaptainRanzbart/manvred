import { Device } from "./Device";
import { Symptom } from "./Symptom";


export type SymptomDevice = {
    Device_id?: string | Device | null;
    id: number;
    Symptom_id?: number | Symptom | null;
};
