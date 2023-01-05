import {
  DocumentData,
  collection,
  onSnapshot,
  CollectionReference,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase/initFirebase";
import { SprintData } from "../../model/SprintData";

type SprintDataWithoutID = Omit<SprintData, "id">;

export const getSprints = (setData: (value: SprintData[]) => void): void => {
  const sprintsCollectionRef: CollectionReference<DocumentData> = collection(
    db,
    "sprints"
  );

  onSnapshot(sprintsCollectionRef, (snapshot) => {
    setData(
      snapshot.docs.map((doc) => ({
        ...(doc.data() as SprintDataWithoutID),
        id: doc.id,
      }))
    );
  });

  return;
};

export const getSprintByID = (
  id: string | undefined,
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

  return;
};

export const getSprintID = async (id: string | undefined) => {
  const collectionRef = collection(db, "sprints");

  const snapshots = await getDocs(collectionRef);

  const docs = snapshots.docs.map((doc) => {
    const data = doc.data();
    data.id = doc.id;

    return data;
  });

  return docs.find((sprint) => sprint.id === id);
};
