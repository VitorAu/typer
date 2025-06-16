import { UserContext } from "@/api/context/user.context";
import { RoundRepository } from "@/api/repository/round";
import { UserRepository } from "@/api/repository/user";
import { CountDown } from "@/components/countDown";
import { StopWatch } from "@/components/stopWatch";
import { RoundType } from "@/types/round";
import { useContext, useEffect, useRef, useState } from "react";
import { ConfettiExplosion } from "react-confetti-explosion";
import { Link } from "react-router";

export function TyperGame() {
  const [isCountDownComplete, setIsCountDownComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPoints, setIsPoints] = useState(0);
  const [isHighscore, setIsHighscore] = useState(0);
  const [time, setTime] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const roundRepository = new RoundRepository();
  const userRepository = new UserRepository();
  const inputRef = useRef<HTMLInputElement>(null);
  const countDown = ["3", "2", "1", "GO"];
  const wordAmount = 20;
  const { user, setUser } = useContext(UserContext);

  async function fetchWords() {
    try {
      const response = await fetch(
        `https://random-word-api.vercel.app/api?words=${wordAmount}`
      );
      const data = await response.json();
      setWords(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleCreateRound() {
    if (!user?.id) return;

    setIsLoading(true);
    try {
      const points = (wordAmount / time) * 60 * 100000;
      setIsPoints(points);
      const data: RoundType = {
        score: points,
        total_time: time,
      };
      const createResponse = await roundRepository.create(user?.id, data);
      if (!createResponse) return;

      if (points > user.highscore) {
        setIsHighscore(points);
        try {
          const updateResponse = await userRepository.update(user.id, points);
          setUser(updateResponse);
          if (!updateResponse) return;
        } catch (error) {
          console.error(error);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;

    const noSpaceRegex = /^\S*$/;
    if (noSpaceRegex.test(value)) {
      setInputWord(value);
    }

    if (value.trim() === words[currentIndex]) {
      setCurrentIndex((prev) => prev + 1);
      setInputWord("");
    }
  }

  function handleReloadButton() {
    setIsCountDownComplete(false);
    setWords([]);
    setInputWord("");
    setCurrentIndex(0);
    setTime(0);
    setIsActive(true);
    setIsHighscore(0);
    setIsPoints(0);
    fetchWords();
  }

  useEffect(() => {
    if (!isLoading && words.length === currentIndex && currentIndex !== 0) {
      setIsActive(false);
      handleCreateRound();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [words, currentIndex]);

  function gameSection() {
    return (
      <div className="flex flex-col w-96 items-center justify-center gap-6 relative">
        <div className="text-2xl font-thin filter brightness-125 relative select-none">
          {currentIndex}/{words.length} -{" "}
          <StopWatch isActive={isActive} time={time} setTime={setTime} />{" "}
          {isPoints !== 0 && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-[500px] brightness-125 flex justify-center">
              {isPoints.toFixed(1)} points
            </div>
          )}
          {user?.id && isHighscore !== 0 && isHighscore > user?.highscore && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-[200px] brightness-125 flex justify-center text-xs text-yellow-400 font-semibold animate-bounce-rotate">
              NEW HIGHSCORE!{" "}
              <ConfettiExplosion
                force={0.4}
                duration={2200}
                particleCount={30}
                width={400}
              />
            </div>
          )}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 select-none">
          {words.map((word, index) => {
            return (
              <span
                className={`transition-all duration-100 ease-in ${
                  index < currentIndex
                    ? "text-[#A6A6A6] filter brightness-125"
                    : "text-[#A6A6A6]/40"
                }`}
                key={index}
              >
                {word}
              </span>
            );
          })}
        </div>
        <input
          ref={inputRef}
          value={inputWord}
          onChange={handleInput}
          disabled={currentIndex === words.length}
          className="bg-transparent border-[#A6A6A6] border-b text-center outline-none pb-1"
        />

        <div className="flex gap-4 items-center justify-center">
          <Link
            to={`/menu/${user?.id}`}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            back
          </Link>
          <button
            type="button"
            onClick={handleReloadButton}
            className="flex justify-center w-32 border border-[#A6A6A6] px-5 py-2 rounded-md hover:border-[#A6A6A6]/60 hover:text-[#A6A6A6]/60 active:border-[#A6A6A6]/40 active:text-[#A6A6A6]/40"
          >
            reload
          </button>
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchWords();
    setIsActive(true);
  }, []);

  useEffect(() => {
    if (isCountDownComplete && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isCountDownComplete]);

  useEffect(() => {
    if (words.length === currentIndex && currentIndex != 0) {
      setIsActive(false);
    }
  }, [words, currentIndex]);

  return (
    <section className="flex items-center justify-center">
      {!isCountDownComplete && (
        <div className="flex flex-col items-center justify-center gap-4">
          <CountDown
            countDownItems={countDown}
            onComplete={() => setIsCountDownComplete(true)}
          />
        </div>
      )}
      {isCountDownComplete && gameSection()}
    </section>
  );
}
