import Link from "next/link";

interface MenuItemProps {
  texto: string;
  icone: JSX.Element;
  url?: string;
  open: boolean;
}

export default function SidebarItem({
  texto,
  icone,
  url,
  open,
}: MenuItemProps) {
  return (
    <>
      <Link href={{ pathname: url }} className="no-underline">
        <li
          className={`flex rounded-md p-2 mt-5 cursor-pointer hover:bg-light-white text-gray-300 text-lg items-center gap-x-4`}
        >
          <div>{icone}</div>
          <span
            className={`${open === false && "hidden"} origin-left duration-200`}
          >
            {texto}
          </span>
        </li>
      </Link>
    </>
  );
}
