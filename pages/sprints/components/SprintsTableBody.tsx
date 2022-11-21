import { Timestamp } from "firebase/firestore";
import { SprintData } from "../../../model/SprintData";

interface SprintsTableProps {
  sprintsArray?: SprintData[];
}

export default function SprintsTableBody({ sprintsArray }: SprintsTableProps) {
  const formatarData = (data: Timestamp) => {
    if (data) {
      let newDate = data.toDate().toLocaleString("pt-BR");

      return newDate.split(" ")[0];
    }
  };

  return (
    <tbody className="rounded-b-lg">
      {sprintsArray?.map((sprint: SprintData) => (
        <tr key={sprint.id}>
          <td>{sprint.name}</td>
          <td>{formatarData(sprint.date)}</td>
          <td>{sprint.tasks.length}</td>
        </tr>
      ))}
    </tbody>
  );
}
