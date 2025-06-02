import { Button } from "../ui/button";

export default function DefaultTheme() {
  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="border  w-full h-auto p-5 border-gray-400">
        <div className=" flex flex-col gap-4 relative rounded-md py-4 px-0 bg-white overflow-hidden w-full h-full justify-center mt-10 mb-10 ">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-300 rounded px-4 py-2 text-sm text-center shadow-sm"
            />
          ))}
        </div>
      </div>
      <p>Default</p>
    </div>
  );
}
