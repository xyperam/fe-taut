export default function Preview() {
  return (
    <div className="w-[300px] h-[600px] rounded-[2.5rem] border-8 border-black shadow-xl overflow-hidden bg-white flex flex-col items-center">
      {/* "Layar" handphone */}
      <div className="w-full h-full overflow-y-auto p-4">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/avatar.jpg"
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover"
          />
          <h2 className="text-lg font-bold">@username</h2>
          <p className="text-sm text-gray-600 text-center">
            Bio singkat pengguna di sini
          </p>

          {/* Link buttons */}
          <a
            href="#"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md text-center hover:bg-blue-600"
          >
            Link 1
          </a>
          <a
            href="#"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md text-center hover:bg-green-600"
          >
            Link 2
          </a>
        </div>
      </div>
    </div>
  );
}
