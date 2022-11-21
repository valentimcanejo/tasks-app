import { SprintData } from "../../../model/SprintData";
import SprintsTableBody from "./SprintsTableBody";
import SprintsTableHead from "./SprintsTableHead";

interface SprintsTableProps {
  sprintsArray?: SprintData[];
}

export default function SprintsTable({ sprintsArray }: SprintsTableProps) {
  return (
    <table className="table w-full">
      <SprintsTableHead />

      <SprintsTableBody sprintsArray={sprintsArray} />
    </table>
  );
}
