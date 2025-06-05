import { UserContext } from "@/api/context/user.context";
import { useContext } from "react";
import { useNavigate } from "react-router";
import Typewriter from "typewriter-effect";

export function MenuPage() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  function handleStart() {
    navigate(`/game/${user?.id}`);
  }

  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <span className="text-2xl font-thin filter brightness-125">
        <Typewriter
          options={{
            strings: user?.name,
            autoStart: true,
            loop: false,
          }}
        />
      </span>
      <span className="text-2xl font-thin filter brightness-125">
        Highscore: {user?.highscore} points
      </span>
      <div className="flex gap-4">
        <button
          onClick={() => {
            setUser(null);
            navigate("/");
          }}
          className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
        >
          logout
        </button>
        <button
          onClick={handleStart}
          className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
        >
          start
        </button>
      </div>
    </section>
  );
}
