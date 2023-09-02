import { FC, useEffect, useState } from "react";
import { BiSolidTimeFive } from "react-icons/bi";

interface TickerProps {
  startTime: number;
}
export const TrainingTimeTicker: FC<TickerProps> = ({ startTime }) => {
  const [time, setTime] = useState(startTime);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setTime(new Date().getTime() - startTime);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [startTime]);
  const seconds = new Date(time).getSeconds();
  const minutes = new Date(time).getMinutes();
  const hours = new Date(time).getHours() - 1;

  return (
    <>
      <span className="text-slate-400">
        <BiSolidTimeFive size={20} />
      </span>
      {`${hours.toString().padStart(2, "0")} : ${minutes
        .toString()
        .padStart(2, "0")} : ${seconds.toString().padStart(2, "0")}`}
    </>
  );
};
