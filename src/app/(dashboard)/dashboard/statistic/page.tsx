import Image from "next/image";
export default function Statistic() {
  return (
    <div className="flex justify-center items-center h-full min-h-[300px]">
      <Image
        src={"/images/workInProgress.gif"}
        alt="work in progress"
        width={300}
        height={300}
      />
    </div>
  );
}
