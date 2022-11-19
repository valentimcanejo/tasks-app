import { Timestamp } from "firebase/firestore";

export interface SprintData {
  id: string;
  name: string;
  date: Timestamp;
  tasks: string[];
}
