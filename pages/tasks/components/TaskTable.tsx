import { DocumentData } from "firebase/firestore";
import TasksTableBody from "./TasksTableBody";
import TasksTableHead from "./TaskTableHead";

interface TasksInterface {
  tasksArray?: DocumentData[];
}

export default function TaskTable({ tasksArray }: TasksInterface) {
  return (
    <table className="table w-full">
      <TasksTableHead />
      <TasksTableBody tasksArray={tasksArray} />
    </table>
  );
}
