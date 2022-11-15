import { NextApiRequest, NextApiResponse } from "next";

import { getDocs, collection, addDoc, onSnapshot } from "firebase/firestore";
import db, { storage } from "../../firebase/initFirebase";
import nextConnect from "next-connect";
import { ref, StorageReference, uploadString } from "firebase/storage";

interface ResponseError {
  message: string;
}

interface Dev {
  id: string;
  name: string;
}

interface Task {
  description: string;
  type: string;
  dev: Dev;
  status: string;
  date: Date;
}

interface Response {
  message: string;
}

const apiRoute = nextConnect({
  onError(error, req: NextApiRequest, res: NextApiResponse) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  },
});

apiRoute.post(
  async (
    req: NextApiRequest,
    res: NextApiResponse<Response | ResponseError>
  ) => {
    const {
      body: { description, type, dev },
    } = req;

    const tasksCollectionRef = collection(db, "tasks");

    const data: Task = {
      description,
      type,
      dev,
      status: "A Fazer",
      date: new Date(),
    };

    try {
      await addDoc(tasksCollectionRef, data);

      return res.status(201).json({
        message: "Task created",
      });
    } catch (error) {
      return res.status(500).json({ message: `Error creating task.` });
    }
  }
);

export default apiRoute;
