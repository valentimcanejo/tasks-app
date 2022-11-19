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

import SprintsSelect from "./components/SprintsSelect";
import TaskTable from "./components/TaskTable";
import db from "../../firebase/initFirebase";
import useWindowSize from "../../hooks/useWindowSize";
import { getSprintByID, getSprints } from "../../service/sprints";
import { getTasks } from "../../service/tasks";
import Sidebar from "../../components/Sidebar";
import { TaskData } from "../../model/TaskData";
import { SprintData } from "../../model/SprintData";

export default function Tasks() {
  const [tasksArray, setTasksArray] = useState<TaskData[]>();
  const [sortedTasksArray, setSortedTasksArray] = useState<TaskData[]>();
  const [selected, setSelected] = useState<any>(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("printAtual");
    }
  });
  const [arraySprints, setArraySprints] = useState<SprintData[]>();
  const [arraySprintTasks, setArraySprintTasks] = useState<TaskData[]>();
  const windowWidth = useWindowSize();

  const addTask = async () => {
    const collectionRef: CollectionReference<DocumentData> = collection(
      db,
      "tasks"
    );

    const data = {
      date: new Date(),
      description: "",
      dev: "Selecionar",
      status: "A Fazer",
      type: "Nova",
    };

    await addDoc(collectionRef, data);
  };

  const getAllTasks = async () => {
    getTasks(setTasksArray);
  };

  const getAllSprints = async () => {
    try {
      getSprints(setArraySprints);
    } catch (error) {}
  };

  const getTasksByIds = async () => {
    let array: TaskData[] = [];

    sortedTasksArray?.map(
      (task: TaskData) => selected?.tasks?.includes(task.id) && array.push(task)
    );

    const sprintTasksWithoutUndefined = array?.filter((element: TaskData) => {
      return element !== undefined;
    });

    setArraySprintTasks(sprintTasksWithoutUndefined);
  };

  const getSprint = async () => {
    if (typeof window !== "undefined") {
      const id: string | null = localStorage.getItem("printAtual");
      if (id) {
        getSprintByID(id, setSelected);
      } else {
        setSelected({ id: "", name: "" });
      }
    }
  };

  useEffect(() => {
    getSprint();
  }, []);

  useEffect(() => {
    getTasksByIds();
  }, [sortedTasksArray, selected]);

  useEffect(() => {
    getAllSprints();
  }, []);

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    const sortByDevName: TaskData[] | undefined = tasksArray?.sort(
      (a: TaskData, b: TaskData) => (a.dev > b.dev ? 1 : b.dev > a.dev ? -1 : 0)
    );
    setSortedTasksArray(sortByDevName);
  }, [tasksArray]);

  return (
    <Sidebar>
      <Header titulo="Tarefas" />
      <div className="flex flex-col ">
        <div className="mx-4">
          <div className="flex justify-between mt-6">
            <SprintsSelect
              setSelected={setSelected}
              selected={selected}
              sprints={arraySprints}
            />

            <div
              onClick={addTask}
              //onClick={() => setOpenModalCreateTask(true)}
              className="cursor-pointer"
            >
              {AddIcon}
            </div>
          </div>

          <div
            className={`card ${
              windowWidth && windowWidth <= 640 ? "overflow-x-auto" : ""
            } bg-base-100 shadow-xl`}
          >
            <div className="card-body p-0">
              <TaskTable tasksArray={arraySprintTasks} />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}
