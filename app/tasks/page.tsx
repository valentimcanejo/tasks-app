"use client";

import { useState } from "react";
import Header from "../../components/Header";
import { AddIcon } from "../../components/icons";
import ModalCreateTask from "../../components/ModalCreateTask";

export default function Tasks() {
  const [openModalCreateTask, setOpenModalCreateTask] = useState(false);

  return (
    <>
      <div>
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
      </div>
      <ModalCreateTask
        open={openModalCreateTask}
        onClose={setOpenModalCreateTask}
      />
    </>
  );
}
