import { collection, doc, DocumentData, updateDoc } from "firebase/firestore";
import db from "../firebase/initFirebase";
import DropdownDevs from "./DropdownDevs";
import DropdownStatus from "./DropdownStatus";
import DropdownType from "./DropdownType";

interface TasksInterface {
  tasksArray?: DocumentData[];
}

const arrayTypes: string[] = ["Nova", "Erro", "Curso"];

export default function TasksTableBody({ tasksArray }: TasksInterface) {
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
            {/* <div className="dropdown">
              <label className="cursor-pointer" tabIndex={0}>
                {task?.type}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content absolute menu cursor-pointer p-2 shadow bg-base-300 rounded-box w-52"
              >
                {arrayTypes.map((type: string) => (
                  <li key={type} onClick={() => updateTaskType(task, type)}>
                    <a>{type}</a>
                  </li>
                ))}
              </ul>
            </div> */}
          </td>
          <td className="w-1/6">
            <DropdownDevs task={task} />
            {/* <div className="dropdown ">
              <label className="cursor-pointer" tabIndex={0}>
                {task?.dev}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content absolute menu cursor-pointer p-2 shadow bg-base-300 rounded-box w-52"
              >
                {arrayDevs.map((dev: string) => (
                  <li key={dev} onClick={() => updateTaskDev(task, dev)}>
                    <a>{dev}</a>
                  </li>
                ))}
              </ul>
            </div> */}
          </td>
          <td className="text-sm">{task?.description}</td>
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
            {/* <div className="dropdown dropdown-end">
              <label className="cursor-pointer" tabIndex={0}>
                {task?.status}
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu cursor-pointer p-2 shadow bg-base-300 rounded-box w-52"
              >
                {arrayStatus.map((status: string) => (
                  <li
                    key={status}
                    onClick={() => updateTaskStatus(task, status)}
                  >
                    <a>{status}</a>
                  </li>
                ))}
              </ul>
            </div> */}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
