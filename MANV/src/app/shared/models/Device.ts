import { Room } from './Room';

export type Device = {
  Duration?: number | null;
  id: string;
  Name?: string | null;
  Room?: Room | null;
};
