import React from "react";
import { Popover } from "@headlessui/react";
import ProgressBar from "../ProgressBar";
import clsx from "clsx";

interface IHabitTile {
  total?: number;
  completed?: number;
  date?: Date;
}

const HabitTile = ({ total = 0, completed = 0 }: IHabitTile) => {
  const completedPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <Popover className="relative">
      <Popover.Button>
        <div
          className={clsx("h-10 w-10 rounded-lg border-2", {
            "border-zinc-800 bg-zinc-900": completedPercentage === 0,
            "border-violet-400 bg-violet-800": completedPercentage === 100,
            "border-violet-400 bg-violet-700":
              completedPercentage >= 80 && completedPercentage < 100,
            "border-violet-400 bg-violet-600":
              completedPercentage >= 60 && completedPercentage < 80,
            "border-violet-400 bg-violet-500":
              completedPercentage < 60 && completedPercentage > 0,
          })}
        />
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex w-52 max-w-md flex-col gap-2 rounded-md bg-zinc-900 p-4 shadow-lg">
          <span className="text-xs font-bold text-zinc-500"> terça-feira </span>
          <h3 className="text-2xl font-bold text-white"> 03/01 </h3>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-6 flex flex-col gap-3"></div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default HabitTile;
