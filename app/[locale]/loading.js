import { AOSInit } from "@/components/AOSInit";
export default function Loading() {
  return (
    <>
      <div className="flex justify-center items-center w-[100vw] h-[100vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-black border-solid border-r-transparent"></div>
      </div>
      <AOSInit />
    </>
  );
}
