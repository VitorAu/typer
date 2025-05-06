import { Link, useNavigate } from "react-router";

export function MenuPage() {
  const navigate = useNavigate();

  function handleStart() {
    navigate("/game");
  }

  return (
    <section className="flex flex-col items-center justify-center gap-6">
      <span className="text-2xl font-thin filter brightness-125">V1T1N</span>
      <span className="text-2xl font-thin filter brightness-125">Highscore: 2345 points</span>
      <div className="flex gap-4">
        <Link
          to="/"
          className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
        >
          logout
        </Link>
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
