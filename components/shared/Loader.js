import { RiLoader5Line } from "react-icons/ri";
export default function Loader({ absolute }) {
  return (
    <div
      className={`${
        absolute ? "absolute" : ""
      } flex items-center justify-center h-auto w-full z-50`}
    >
      <RiLoader5Line className=" animate-spin text-zinc-500" style={{ width: "32px" }} />
    </div>
  );
}
