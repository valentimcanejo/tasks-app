import { DocumentData } from "firebase/firestore";
import { useState } from "react";

import DropdownDevs from "./DropdownDevs";
import DropdownStatus from "./DropdownStatus";
import DropdownType from "./DropdownType";
import ModalEditDescription from "./ModalEditDescription";

interface TasksInterface {
  tasksArray?: DocumentData[];
}

export default function TasksTableBody({ tasksArray }: TasksInterface) {
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<DocumentData | undefined>();

  return (
    <tbody className="rounded-b-lg">
      {tasksArray?.map((task) => (
        <tr key={task?.id} className="rounded-b-lg">
          <td
            className={`w-1/12 ${
              task?.type === "Erro"
                ? "bg-red-400 text-white"
                : task?.type === "Curso"
                ? "bg-green-400 text-white"
                : task?.type === "Nova"
                ? ""
                : null
            }`}
          >
            <DropdownType task={task} />
          </td>
          <td className="w-1/6">
            <DropdownDevs task={task} />
          </td>
          <td className="text-sm flex justify-between">
            <div>{task?.description}</div>{" "}
            <div
              className="text-primary cursor-pointer"
              onClick={() => {
                setOpenModalEdit(true), setSelectedTask(task);
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
          </td>
          <td
            className={`w-1/12 text-center  text-white ${
              task?.status === "A Fazer"
                ? "bg-red-400"
                : task?.status === "Concluído"
                ? "bg-blue-400"
                : task?.status === "Em Teste"
                ? "bg-green-400"
                : task?.status === "Fazendo"
                ? "bg-orange-400"
                : null
            }`}
          >
            <DropdownStatus task={task} />
          </td>
        </tr>
      ))}
      <tr>
        <td>
          <ModalEditDescription
            open={openModalEdit}
            onClose={setOpenModalEdit}
            task={selectedTask}
          />
        </td>
      </tr>
    </tbody>
  );
}
