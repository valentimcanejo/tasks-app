"use client";

import { addDoc, collection, doc, DocumentData } from "firebase/firestore";
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

export default function Tasks() {
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);
  const [tasksArray, setTasksArray] = useState<DocumentData[]>();
  const [sortedTasksArray, setSortedTasksArray] = useState<DocumentData[]>();
  const [selected, setSelected] = useState<any>(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("printAtual");
    }
  });
  const [arraySprints, setArraySprints] = useState<DocumentData[]>();
  const [arraySprintTasks, setArraySprintTasks] = useState<any>();
  const windowWidth = useWindowSize();

  const addTask = async () => {
    const collectionRef = collection(db, "tasks");

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
    let array: any = [];

    sortedTasksArray?.map(
      (task) => selected?.tasks?.includes(task.id) && array.push(task)
    );

    const sprintTasksWithoutUndefined = array?.filter((element: any) => {
      return element !== undefined;
    });

    setArraySprintTasks(sprintTasksWithoutUndefined);
  };

  const getSprint = async () => {
    if (typeof window !== "undefined") {
      const id = localStorage.getItem("printAtual");
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

  // useEffect(() => {
  //   localStorage.setItem("printAtual", selected.name);
  // }, []);

  useEffect(() => {
    getAllSprints();
  }, []);

  useEffect(() => {
    getAllTasks();
  }, []);

  useEffect(() => {
    const sortByDevName = tasksArray?.sort((a, b) =>
      a.dev > b.dev ? 1 : b.dev > a.dev ? -1 : 0
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
