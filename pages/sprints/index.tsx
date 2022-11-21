"use client";

import {
  addDoc,
  collection,
  CollectionReference,
  DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { AddIcon } from "../../components/icons";
import Sidebar from "../../components/Sidebar";
import db from "../../firebase/initFirebase";
import useWindowSize from "../../hooks/useWindowSize";
import { SprintData } from "../../model/SprintData";
import { getSprints } from "../../service/sprints";
import ModalCreateSprint from "./components/ModalCreateSprint";
import SprintsTable from "./components/SprintsTable";

export default function Sprints() {
  const windowWidth = useWindowSize();
  const [sprintsArray, setSprintsArray] = useState<SprintData[]>();
  const [openModalCreateSprint, setOpenModalCreateSprint] = useState(false);

  const getAllSprints = async () => {
    getSprints(setSprintsArray);
  };

  useEffect(() => {
    getAllSprints();
  }, []);

  return (
    <Sidebar>
      <Header titulo="Sprints" />
      <div className="mx-4">
        <div className="flex flex-col">
          <div
            onClick={() => setOpenModalCreateSprint(true)}
            className="cursor-pointer"
          >
            {AddIcon}
          </div>
          <div
            className={`card ${
              windowWidth && windowWidth <= 640 ? "overflow-x-auto" : ""
            } bg-base-100 shadow-xl`}
          >
            <div className="card-body p-0">
              <SprintsTable sprintsArray={sprintsArray} />
            </div>
          </div>
        </div>
      </div>
      <ModalCreateSprint
        open={openModalCreateSprint}
        onClose={setOpenModalCreateSprint}
      />
    </Sidebar>
  );
}
