import { CountDown } from "@/components/countDown";
import { StopWatch } from "@/components/stopWatch";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";

export function TyperGame() {
  const [isCountDownComplete, setIsCountDownComplete] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [inputWord, setInputWord] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [words, setWords] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const countDown = ["3", "2", "1", "GO"];

  const gameSection = () => {
    return (
      <div className="flex flex-col w-96 items-center justify-center gap-6">
        <span className="text-2xl font-thin filter brightness-125">
          {currentIndex}/{words.length} -{" "}
          <StopWatch isActive={isActive} time={time} setTime={setTime} />
        </span>
        <div className="flex flex-wrap items-center justify-center gap-2">
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
            to="/menu"
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
  };

  async function fetchWords() {
    try {
      const response = await fetch(
        "https://random-word-api.vercel.app/api?words=20"
      );
      const data = await response.json();
      setWords(data);
    } catch (err) {
      console.log(err);
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
    fetchWords();
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
