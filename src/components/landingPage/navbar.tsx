import Link from "next/link";
export default function Navbar() {
  return (
    <div className="bg-[#A7A3F0] mt-2 rounded-full p-4 max-w-screen-xl mx-auto ">
      <nav className="flex flex-row justify-between items-center">
        <div>
          <h1 className="text-white font-bold text-xl text-center">Wizzlink</h1>
        </div>
        <div>
          <div className="flex flex-row gap-2">
            <Link
              href="/login"
              className="text-white font-md rounded-md hover:bg-purple-600 p-2"
            >
              Login
            </Link>
            <Link
              className="text-white font-xl rounded-full bg-purple-500 hover:bg-purple-600 p-2"
              href="/register"
            >
              Sign up
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
