import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import db from "../../firebase/initFirebase";

export const getSprints = (setData: (value: DocumentData[]) => void) => {
  const tasksCollectionRef = collection(db, "sprints");

  onSnapshot(tasksCollectionRef, (snapshot) => {
    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return;
};
