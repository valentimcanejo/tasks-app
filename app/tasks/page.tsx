"use client";

import { DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { AddIcon } from "../../components/icons";
import ModalCreateTask from "../../components/ModalCreateTask";
import TaskTable from "../../components/TaskTable";
import { getTasks } from "../../service/tasks";

export default function Tasks() {
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);
  const [tasksArray, setTasksArray] = useState<DocumentData[]>();
  const [sortedTasksArray, setSortedTasksArray] = useState<DocumentData[]>();

  const getAllTasks = async () => {
    getTasks(setTasksArray);
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    const sortByDevName = tasksArray?.sort((a, b) =>
      a.dev.name > b.dev.name ? 1 : b.dev.name > a.dev.name ? -1 : 0
    );
    setSortedTasksArray(sortByDevName);
  }, [tasksArray]);

  return (
    <>
      <div className="flex flex-col">
        <Header titulo="Tasks" />
        <div className="flex px-4 justify-between mt-6">
          <div className="text text-lg">Lista de Tarefas:</div>
          <div
            onClick={() => setOpenModalCreateTask(true)}
            className="cursor-pointer"
          >
            {AddIcon}
          </div>
        </div>
        <div className="overflow-x-auto">
          <TaskTable tasksArray={sortedTasksArray} />
        </div>
      </div>
      <ModalCreateTask
        open={openModalCreateTask}
        onClose={setOpenModalCreateTask}
      />
    </>
  );
}
