import {
  collection,
  CollectionReference,
  DocumentData,
  onSnapshot,
} from "firebase/firestore";
import db from "../../firebase/initFirebase";
import { TaskData } from "../../model/TaskData";

export const getTasks = (setData: (value: TaskData[]) => void) => {
  const tasksCollectionRef: CollectionReference<DocumentData> = collection(
    db,
    "tasks"
  );

  onSnapshot(tasksCollectionRef, (snapshot) => {
    setData(
      snapshot.docs.map((doc) => ({ ...(doc.data() as TaskData), id: doc.id }))
    );
  });

  return;
};
