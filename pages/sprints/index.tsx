"use client";

import { useEffect, useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import useWindowSize from "../../hooks/useWindowSize";
import { SprintData } from "../../model/SprintData";
import { getSprints } from "../../service/sprints";
import SprintsTable from "./components/SprintsTable";

export default function Sprints() {
  const windowWidth = useWindowSize();
  const [sprintsArray, setSprintsArray] = useState<SprintData[]>();
  console.log(sprintsArray);

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
    </Sidebar>
  );
}
