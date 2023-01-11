import React, { useState, useCallback } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from "immutability-helper";
import KanbanColumn from "./components/KanbanColumn";
import KanbanItem from "./components/KanbanItem";

const tasksList = [
  { _id: 1, title: "First Task", status: "backlog" },
  { _id: 2, title: "Second Task", status: "backlog" },
  { _id: 3, title: "Third Task", status: "backlog" },
  { _id: 4, title: "Fourth Task", status: "new" },
  { _id: 5, title: "Fifth Task", status: "new" },
  { _id: 6, title: "Sixth Task", status: "wip" },
  { _id: 7, title: "Seventh Task", status: "review" },
  { _id: 8, title: "Eighth Task", status: "review" },
  { _id: 9, title: "Ninth Task", status: "done" },
  { _id: 10, title: "Tenth Task", status: "done" },
];

const channels = ["backlog", "new", "wip", "review", "done"];
const labelsMap: any = {
  backlog: "Backlog",
  new: "To Do",
  wip: "In Progress",
  review: "Review",
  done: "Done",
};

const classes: any = {
  board: {
    display: "flex",
    margin: "0 auto",
    width: "90vw",
    fontFamily: 'Arial, "Helvetica Neue", sans-serif',
  },
  column: {
    minWidth: 200,
    width: "18vw",
    height: "80vh",
    margin: "0 auto",
    backgroundColor: "#FCC8B2",
  },
  columnHead: {
    textAlign: "center",
    padding: 10,
    fontSize: "1.2em",
    backgroundColor: "#C6D8AF",
  },
  item: {
    padding: 10,
    margin: 10,
    fontSize: "0.8em",
    cursor: "pointer",
    backgroundColor: "white",
  },
};

export default function Test() {
  const [tasks, setTaskStatus] = useState(tasksList);

  const changeTaskStatus = useCallback(
    (id: any, status: any) => {
      let task: any = tasks.find((task) => task._id === id);
      const taskIndex = tasks.indexOf(task);
      task = { ...task, status };
      let newTasks = update(tasks, {
        [taskIndex]: { $set: task },
      });
      setTaskStatus(newTasks);
    },
    [tasks]
  );

  return (
    <>
      <div> Kanban Board </div>
      <div style={classes.board}>
        {channels.map((channel) => (
          <KanbanColumn
            key={channel}
            status={channel}
            changeTaskStatus={changeTaskStatus}
          >
            <div style={classes.column}>
              <div style={classes.columnHead}>{labelsMap[channel]}</div>
              <div>
                {tasks
                  .filter((item) => item.status === channel)
                  .map((item) => (
                    <KanbanItem key={item._id} id={item._id}>
                      <div style={classes.item}>{item.title}</div>
                    </KanbanItem>
                  ))}
              </div>
            </div>
          </KanbanColumn>
        ))}
      </div>
    </>
  );
}

// import { useEffect, useState } from "react";
// import { DndProvider } from "react-dnd";
// import { HTML5Backend } from "react-dnd-html5-backend";
// import { TaskData } from "../../model/TaskData";
// import { getTasks } from "../../service/tasks";

// import Card from "./components/Card";

// export default function Test() {
//   const [tasksArray, setTasksArray] = useState<TaskData[]>();
//   const getAllTasks = async () => {
//     getTasks(setTasksArray);
//   };

//   useEffect(() => {
//     getAllTasks();
//   }, []);
//   console.log(tasksArray);

//   return (
//     <>
//       <DndProvider backend={HTML5Backend}>
//         <div className="p-12 flex flex-col gap-4 w-1/4 ">
//           <label>A Fazer</label>
//           {tasksArray?.map((task) => (
//             <Card text={task.description} />
//           ))}
//         </div>
//       </DndProvider>
//     </>
//   );
// }
