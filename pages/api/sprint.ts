import { NextApiRequest, NextApiResponse } from "next";

import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase/initFirebase";
import nextConnect from "next-connect";

interface ResponseError {
  message: string;
}

interface Sprint {
  name: string;
  date: Date;
  tasks: string[];
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
      body: { name },
    } = req;

    const tasksCollectionRef = collection(db, "sprints");

    const data: Sprint = {
      name,
      date: new Date(),
      tasks: [],
    };

    try {
      await addDoc(tasksCollectionRef, data);

      return res.status(201).json({
        message: "Sprint created",
      });
    } catch (error) {
      return res.status(500).json({ message: `Error creating sprint.` });
    }
  }
);

export default apiRoute;
