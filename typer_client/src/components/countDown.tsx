import { useEffect, useState } from "react";

interface CountDownProps {
  countDownItems: string[];
  onComplete: () => void;
}

export function CountDown({ countDownItems, onComplete }: CountDownProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < countDownItems.length - 1) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setTimeout(() => onComplete(), 800);
    }
  }, [index, countDownItems.length, onComplete]);

  return <span className="text-2xl font-thin filter brightness-125">{countDownItems[index]}</span>;
}
