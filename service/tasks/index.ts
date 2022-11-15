import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import db from "../../firebase/initFirebase";

export const getTasks = (setData: (value: DocumentData[]) => void) => {
  const tasksCollectionRef = collection(db, "tasks");

  onSnapshot(tasksCollectionRef, (snapshot) => {
    setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  });

  return;
};

// export const getDocsConvenio = async (
//     setData: (value: DocumentData[]) => void,
//     convenio: string | undefined
//   ) => {
//     if (convenio) {
//       const queryConvenio = query(
//         getCollection(db, "convenios"),
//         where("nome", "==", convenio)
//       );

//       onSnapshot(queryConvenio, snapshot => {
//         setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
//       });

//       return;
//     }
//   };
