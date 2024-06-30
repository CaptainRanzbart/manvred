import { Symptom } from './Symptom';
import { Patient } from './Patient';
import { Image } from './Image';

export type ExaminationResult = {
  Bodypart?: string | null;
  id: string;
  Patient?: Patient | null;
  Recognized?: boolean | null;
  Symptom?: Symptom;
  Image?: Image;
};
