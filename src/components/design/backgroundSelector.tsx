export default function BackgroundSelector() {
  return (
    <div className="bg-white flex flex-col mx-auto w-full rounded-md shadow-xl p-4">
      <h1 className="text-lg font-semibold mb-4">Background</h1>
      <div className="flex h-full w-full">
        <div className="py-4 px-0 flex flex-row gap-4 relative rounded-md overflow-hidden p-4 w-full h-full justify-center mt-10 mb-10 h-auto">
          <div className="bg-slate-400 h-full w-full">
            <h1 className="text-whi">Color</h1>
          </div>
          <div className="bg-slate-400 h-full w-full">
            <h1 className="text-whi">Color</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
