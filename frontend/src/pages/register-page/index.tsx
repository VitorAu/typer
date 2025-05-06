import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Link } from "react-router";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { toast } = useToast();

  async function handleRegister() {
    toast({
      title: "Success",
      description: "User registered successfully",
    });
    setEmail("");
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <section className="flex flex-col items-center gap-10">
      <h2 className="font-thin text-2xl">Register</h2>
      <form className="flex flex-col items-center gap-10">
        <div className="flex flex-col gap-4">
          <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
            <input
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
          <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
            <input
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
          <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
          <div className="p-1 pl-2 rounded-md bg-transparent border border-[#A6A6A6] focus-within:border-[#A6A6A6]/60">
            <input
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <button
            type="button"
            onClick={handleRegister}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            confirm
          </button>
          <Link
            to="/"
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            back
          </Link>
        </div>
      </form>
    </section>
  );
}
