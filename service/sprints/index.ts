import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import db from "../../firebase/initFirebase";

export const getSprints = (setData: (value: DocumentData[]) => void) => {
  const tasksCollectionRef = collection(db, "sprints");

  onSnapshot(tasksCollectionRef, (snapshot) => {
    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return;
};

export const getSprintByID = (
  id: string,
  setData: (value: DocumentData | undefined) => void
) => {
  const collectionRef = collection(db, "sprints");
  onSnapshot(collectionRef, (snapshot) => {
    const docs = snapshot.docs.map((doc) => {
      const data = doc.data();
      data.id = doc.id;
      return data;
    });
    const find = docs.find((pedido) => pedido.id === id);

    setData(find);
  });
};

// export const getByID = async ( id: string) => {
//   const collectionRef = collection(db, "sprints");

//   const snapshots = await getDocs(collectionRef);

//   const docs = snapshots.docs.map(doc => {
//     const data = doc.data();
//     data.id = doc.id;

//     return data;
//   });

//   return docs.find(elemento => elemento.id === id);
// };
