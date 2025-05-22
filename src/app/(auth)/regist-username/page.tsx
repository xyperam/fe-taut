import { Input, InputWithPrefix } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function RegistUsernamepage() {
  return (
    <main className="flex flex-col md:flex-row items-center justify-between p-24 h-screen">
      <section className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-24">
        <h1 className="text-2xl font-bold">Join Tautin</h1>
        <p className="text-center">Satu Link untuk semua hal penting</p>
        <h2 className="mt-6 text-sm font-bold">Claim your free Link in Bio </h2>
        <form className="flex flex-col gap-4 mt-4">
          <InputWithPrefix
            prefix="tautin.id/"
            type="text"
            placeholder="Username"
          />
          <Button type="submit" className="bg-blue-500 text-white p-2 h-10">
            Next
          </Button>
        </form>
        <p className="mt-8">
          Already have account?
          <a href="/register" className="text-blue-500 hover:underline">
            Sign in!
          </a>
        </p>
      </section>
      <section className="hidden md:flex w-1/2 h-[500px] items-center justify-center">
        <div className="relative w-full h-full bg-amber-200">
          <Image
            src="/images/background.jpg"
            alt="Foto Profil"
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  );
}
