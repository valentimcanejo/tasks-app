import React, {
  createContext,
  useState,
  useEffect,
  SetStateAction,
  Dispatch,
} from "react";

interface SprintContextProps {
  currentSprint?: string;
  setCurrentSprint?: Dispatch<SetStateAction<string>>;
  setNewSprint?: (sprintID: string) => Promise<void>;
}

const Context = createContext<SprintContextProps>({});

function SprintProvider({ children }: any) {
  const [currentSprint, setCurrentSprint] = useState<any>(() => {
    if (typeof window !== "undefined") {
      localStorage.getItem("currentSprint");
    }
  });

  const [updateSprint, setUpdateSprint] = useState<boolean>();

  const getSprint = async () => {
    if (typeof window !== "undefined") {
      const id: string | null = localStorage.getItem("currentSprint");
      if (id) {
        setCurrentSprint(id);
      }
    }
  };

  const setNewSprint = async (sprintID: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("currentSprint", sprintID);
      setUpdateSprint(!updateSprint);
    }
  };

  useEffect(() => {
    getSprint();
  }, [updateSprint]);

  return (
    <Context.Provider value={{ currentSprint, setCurrentSprint, setNewSprint }}>
      {children}
    </Context.Provider>
  );
}

export { Context, SprintProvider };
