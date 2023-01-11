import { useEffect, useRef } from "react";
import { useDrag } from "react-dnd";

export default function KanbanItem({ id, children }: any) {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    item: { id },
    type: "card",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  drag(ref);

  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
}
