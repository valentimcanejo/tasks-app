import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface TypesSelectProps {
  selected: string;
  setSelected: (value: string) => void;
  types: string[];
}

export default function TypesSelect({
  selected,
  setSelected,
  types,
}: TypesSelectProps) {
  return (
    <div>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg bg-base-200 border-none py-2 pl-3 pr-10 text-left shadow-md focus:outline-none sm:text-sm">
            <span className="block truncate">{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className=" mt-1 max-h-60 px-4 box-border w-full overflow-auto rounded-md bg-base-300 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {types?.map((type) => (
                <Listbox.Option
                  key={type}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 rounded-lg list-none  ${
                      active ? "bg-primary text-white" : "text-base-content"
                    }`
                  }
                  value={type}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {type}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
