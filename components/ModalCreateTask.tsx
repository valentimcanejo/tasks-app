import { Dialog, Transition } from "@headlessui/react";
import { addDoc, collection, getDocs, updateDoc } from "firebase/firestore";
import { ref, uploadString } from "firebase/storage";
import { useRouter } from "next/router";
import { Fragment, useContext, useState } from "react";
import db from "../firebase/initFirebase";
import TypesSelect from "./TypesSelect";
import UsersList from "./UsersList";

interface ModalProps {
  open: boolean;
  onClose: (close: boolean) => void;
}

const users = [
  {
    id: 1,
    name: "Rômulo",
  },
  {
    id: 2,
    name: "Edjan",
  },
  {
    id: 3,
    name: "Gabriel",
  },
  {
    id: 4,
    name: "Jardel",
  },
  {
    id: 5,
    name: "Eric",
  },
  {
    id: 6,
    name: "Silva",
  },
  {
    id: 7,
    name: "Pedro",
  },
];

const types = ["Nova", "Erro", "Curso"];

export default function ModalCriarPedido({
  open = false,
  onClose,
}: ModalProps) {
  const [taskType, setTaskType] = useState<string>(types[0]);
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [taskUser, setTaskUser] = useState<{ id: number; name: string }>();

  const clearFields = () => {
    setTaskDescription("");
    setTaskUser({ id: 0, name: "" });
  };

  const postTask = async (e: any) => {
    e.preventDefault();
    try {
      const data = {
        type: taskType,
        description: taskDescription,
        dev: taskUser?.name,
      };

      await fetch(`/api/task/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      onClose(false);
      clearFields();
    } catch (error) {}
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative  z-50" onClose={onClose}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0  ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl  bg-base-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-base-content mb-4"
                  >
                    Crie uma nova tarefa
                  </Dialog.Title>
                  <form onSubmit={postTask}>
                    <div className="form-control flex flex-col gap-4">
                      <div className="flex gap-1 flex-col">
                        <label className="label flex justify-between">
                          <span className="label-text  text-lg box-border">
                            Tipo da tarefa:
                          </span>
                        </label>
                        <TypesSelect
                          selected={taskType}
                          setSelected={setTaskType}
                          types={types}
                        />
                      </div>

                      <div className="flex gap-1 flex-col">
                        <label className="label flex justify-between">
                          <span className="label-text  text-lg box-border">
                            Descrição da tarefa:
                          </span>
                        </label>
                        <input
                          required
                          value={taskDescription}
                          onChange={(e) => setTaskDescription(e.target.value)}
                          type="text"
                          placeholder="Digite a descrição da tarefa..."
                          className="input input-bordered box-border w-full placeholder-gray-500 placeholder-opacity-70"
                        />
                      </div>
                      <div className="flex  flex-col">
                        <label className="label flex justify-between">
                          <span className="label-text  text-lg box-border">
                            Dev Responsável:
                          </span>
                        </label>
                        <UsersList
                          selected={taskUser}
                          setSelected={setTaskUser}
                          users={users}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <button
                        type="button"
                        className="btn btn-outlined btn-sm"
                        onClick={() => onClose(false)}
                      >
                        Cancelar
                      </button>
                      <button className="btn btn-success btn-sm text-white">
                        Confirmar
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
