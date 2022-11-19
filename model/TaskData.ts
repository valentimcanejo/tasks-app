import { Timestamp } from "firebase/firestore";

export interface TaskData {
  id: string;
  description: string;
  dev: string;
  status: string;
  type: string;
  date: Timestamp;
}
