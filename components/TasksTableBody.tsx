import { DocumentData } from "firebase/firestore";

interface TasksInterface {
  tasksArray?: DocumentData[];
}

export default function TasksTableBody({ tasksArray }: TasksInterface) {
  return (
    <tbody>
      {tasksArray?.map((task) => (
        <>
          <tr>
            <td className="w-1/12">{task?.type}</td>
            <td className="w-1/6">{task?.dev.name}</td>
            <td className="text-sm">{task?.description}</td>
            <td
              className={`w-1/6 text-center text-white ${
                task?.status === "A Fazer" ? "bg-red-400" : null
              }`}
            >
              {task?.status}
            </td>
          </tr>
        </>
      ))}
    </tbody>
  );
}
