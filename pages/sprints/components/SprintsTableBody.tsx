import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
  Timestamp,
} from "firebase/firestore";
import { useState } from "react";
import db from "../../../firebase/initFirebase";
import { SprintData } from "../../../model/SprintData";
import ModalRemoveSprint from "./ModalRemoveSprint";

interface SprintsTableProps {
  sprintsArray?: SprintData[];
}

export default function SprintsTableBody({ sprintsArray }: SprintsTableProps) {
  const [openModalRemoveSprint, setOpenModalRemoveSprint] =
    useState<boolean>(false);
  const [selectedSprint, setSelectedSprint] =
    useState<SprintData | undefined>();

  const formatarData = (data: Timestamp) => {
    if (
      typeof data.seconds === "number" &&
      typeof data.nanoseconds === "number"
    ) {
      if (data) {
        let newDate = data.toDate().toLocaleString("pt-BR");

        return newDate.split(" ")[0];
      }
    }

    throw new Error(
      `Erro - Não foi possível formatar a data do tipo ${typeof data}`
    );

    //type FunctionType = ReturnType<typeof formatarData>;
  };

  return (
    <tbody className="rounded-b-lg">
      {sprintsArray?.map((sprint: SprintData) => (
        <tr key={sprint.id}>
          <td>{sprint.name}</td>
          <td>{formatarData(sprint.date)}</td>
          <td className="text-sm flex place-items-center justify-between">
            <div>{sprint.tasks.length}</div>

            <div
              className="cursor-pointer text-error"
              onClick={() => {
                setOpenModalRemoveSprint(true), setSelectedSprint(sprint);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </div>
          </td>
        </tr>
      ))}

      <ModalRemoveSprint
        open={openModalRemoveSprint}
        onClose={setOpenModalRemoveSprint}
        selectedSprint={selectedSprint}
      />
    </tbody>
  );
}
