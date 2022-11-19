import {
  DocumentData,
  collection,
  onSnapshot,
  CollectionReference,
} from "firebase/firestore";
import db from "../../firebase/initFirebase";
import { SprintData } from "../../model/SprintData";

export const getSprints = (setData: (value: SprintData[]) => void) => {
  const sprintsCollectionRef: CollectionReference<DocumentData> = collection(
    db,
    "sprints"
  );

  onSnapshot(sprintsCollectionRef, (snapshot) => {
    setData(
      snapshot.docs.map((doc) => ({
        ...(doc.data() as SprintData),
        id: doc.id,
      }))
    );
  });

  return;
};

export const getSprintByID = (
  id: string,
  setData: (value: SprintData | undefined) => void
) => {
  const sprintsCollectionRef: CollectionReference<DocumentData> = collection(
    db,
    "sprints"
  );
  onSnapshot(sprintsCollectionRef, (snapshot) => {
    const docs = snapshot.docs.map((doc) => {
      const data = doc.data() as SprintData;
      data.id = doc.id;
      return data;
    });
    const find = docs.find((pedido) => pedido.id === id);

    setData(find);
  });
};
