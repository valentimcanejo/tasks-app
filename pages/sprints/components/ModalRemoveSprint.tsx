import { Dialog, Transition } from "@headlessui/react";
import {
  deleteDoc,
  doc,
  DocumentData,
  DocumentReference,
} from "firebase/firestore";
import { Fragment, MouseEventHandler } from "react";
import db from "../../../firebase/initFirebase";
import { SprintData } from "../../../model/SprintData";

interface ModalProps {
  open: boolean;
  onClose: (close: boolean) => void;
  selectedSprint?: DocumentData;
  onClick?: (e: any) => void;
}

export default function ModalRemoveSprint({
  open = false,
  onClose,
  selectedSprint,
}: ModalProps) {
  const deleteSprint = async (sprint: DocumentData | undefined) => {
    if (sprint) {
      const collectionRef: DocumentReference<DocumentData> = doc(
        db,
        "sprints",
        sprint.id
      );

      await deleteDoc(collectionRef);
      onClose(false);
    }
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={onClose}>
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

          <div className="fixed inset-0 overflow-y-auto">
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-base-200 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 flex justify-between text-base-content mb-8"
                  >
                    Tem certeza que deseja remover esta sprint?
                    <button
                      className="bg-base-200 border-none outline-none cursor-pointer"
                      onClick={() => onClose(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </Dialog.Title>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="btn btn-sm text-white"
                      onClick={() => onClose(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="btn btn-error btn-sm text-white"
                      onClick={() => deleteSprint(selectedSprint)}
                    >
                      Remover
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
