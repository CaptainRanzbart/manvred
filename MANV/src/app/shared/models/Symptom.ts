import { SymptomDevice } from "./SymptomDevice";


export type Symptom = {
    Description?: string | null;
    Device: any[] | SymptomDevice[];
    id: number;
    Name?: string | null;
};
