import { TaskData } from "../../../model/TaskData";
import TasksTableBody from "./TasksTableBody";
import TasksTableHead from "./TaskTableHead";

interface TasksInterface {
  tasksArray?: TaskData[];
}

export default function TaskTable({ tasksArray }: TasksInterface) {
  return (
    <table className="table w-full">
      <TasksTableHead />
      <TasksTableBody tasksArray={tasksArray} />
    </table>
  );
}
