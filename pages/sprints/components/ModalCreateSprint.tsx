import { Dialog, Transition } from "@headlessui/react";

import { Fragment, useState } from "react";

import { TaskData } from "../../../model/TaskData";

interface ModalProps {
  open: boolean;
  onClose: (close: boolean) => void;
}

export default function ModalCreateSprint({
  open = false,
  onClose,
}: ModalProps) {
  const [sprintName, setSprintName] = useState<string | undefined>("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      name: sprintName,
      date: new Date(),
      tasks: [],
    };

    await fetch(`/api/sprint/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    onClose(false);
    setSprintName("");
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
                    Cadastre uma nova sprint
                  </Dialog.Title>
                  <form onSubmit={handleSubmit}>
                    <div className="form-control flex flex-col gap-4">
                      <div className="flex gap-1 flex-col">
                        <input
                          required
                          value={sprintName}
                          onChange={(e) => setSprintName(e.target.value)}
                          type="text"
                          placeholder="Digite o nome da sprint"
                          className="input input-bordered box-border w-full placeholder-gray-500 placeholder-opacity-70"
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
