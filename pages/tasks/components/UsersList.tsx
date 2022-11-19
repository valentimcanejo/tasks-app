import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

interface AutocompleteProps {
  users?: string[];
  selected?: string;
  setSelected?: (value: string) => void;
}

export default function UsersList({
  users,
  selected,
  setSelected,
}: AutocompleteProps) {
  const [query, setQuery] = useState("");

  const usersFiltrados: string[] | undefined =
    query === ""
      ? users
      : users?.filter((user: any) =>
          user?.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1 ">
          <div className="relative w-full  cursor-default overflow-hidden rounded-lg box-border text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:text-sm">
            <Combobox.Input
              required
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 bg-base-200 box-border  text-base-content focus:ring-0"
              displayValue={(user: any) => user?.name}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute border-none inset-y-0 right-0 flex box-border  items-center bg-base-200  pr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="mt-1 max-h-60 px-8 w-full box-border overflow-auto rounded-md bg-base-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {usersFiltrados?.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Usuário não encontrado
                </div>
              ) : (
                usersFiltrados?.map((user: any) => (
                  <Combobox.Option
                    key={user.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-2 rounded-lg list-none  ${
                        active ? "bg-primary text-white" : "text-base-content"
                      }`
                    }
                    value={user}
                  >
                    {({ selected, active }) => (
                      <div>
                        {selected ? (
                          <span
                            className={`absolute flex -left-8 items-center ${
                              active ? "text-white" : "text-teal-600"
                            }`}
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
                                d="M4.5 12.75l6 6 9-13.5"
                              />
                            </svg>
                          </span>
                        ) : null}
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {user.name}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}
