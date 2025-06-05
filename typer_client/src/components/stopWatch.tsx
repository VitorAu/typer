import { useEffect } from "react";

interface StopWatchProps {
  isActive: boolean;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
}

export function StopWatch({ isActive, time, setTime }: StopWatchProps) {
  useEffect(() => {
    let interval = undefined;

    if (isActive) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 10);
    } else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, setTime, time]);

  return (
    <span>
      {time}
      <span className="text-base">ms</span>
    </span>
  );
}
