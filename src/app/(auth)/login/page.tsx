
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function Loginpage(){
    return (
       <main className="flex flex-col items-center justify-between p-24">
        <h1 className="text-2xl font-bold">Tautin</h1>
        <h1 className="text-2xl font-bold">Welcome back! </h1>  
        <form className="flex flex-col gap-4 mt-4 w-80">
        <Input  type="text" placeholder="Username"  />
        <Input type="password" placeholder="Password"  />
      
          <Button type="submit" className="bg-blue-500 text-white p-2">Login</Button>
        </form>
       <p className="mt-4 flex items-center gap-x-1 text-sm">
            Don't have an account?
            <a href="/register" className="text-blue-500 hover:underline">Sign up!</a>
        </p>
                <a href="/" className="text-gray-700 text-sm hover:underline">Forgot password?</a>
         </main>
    );
}