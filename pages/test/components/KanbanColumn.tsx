import { useRef } from "react";
import { useDrop } from "react-dnd";

export default function KanbanColumn({
  status,
  changeTaskStatus,
  children,
}: any) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "card",
    drop(item: any) {
      console.log(status);

      changeTaskStatus(item.id, status);
    },
  });

  drop(ref);
  return (
    <div ref={ref} id={status}>
      {children}
    </div>
  );
}
