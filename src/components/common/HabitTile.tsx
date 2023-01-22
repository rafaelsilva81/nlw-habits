import React from "react";
import { Popover } from "@headlessui/react";
import ProgressBar from "../ProgressBar";
import clsx from "clsx";
import dayjs from "dayjs";
import { api } from "../../utils/api";

import ElementLoader from "./ElementLoader";

interface IHabitTile {
  total?: number;
  completed?: number;
  date: Date;
  refetchSummary: () => void;
}

const HabitTile = ({
  total = 0,
  completed = 0,
  date,
  refetchSummary,
}: IHabitTile) => {
  const completedPercentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  const dayAndMonth = dayjs(date).format("DD/MM");
  const dayFullName = dayjs(date).format("dddd");

  const {
    data,
    isFetching,
    isLoading,
    refetch: dayHabitRefetch,
  } = api.habits.getDayHabits.useQuery({
    date,
  });

  const toggleHabitMutation = api.habits.toggleHabit.useMutation({
    onSuccess: () => {
      dayHabitRefetch({
        throwOnError: false,
      });
      refetchSummary();
    },
    onMutate: () => {
      dayHabitRefetch({
        throwOnError: false,
      });
      refetchSummary();
    },
  });

  const toggleHabitCompletion = (e: React.ChangeEvent<HTMLInputElement>) => {
    const habitId = e.target.value;

    toggleHabitMutation.mutate({
      habitId,
    });
  };

  const isToday = dayjs(date).isSame(new Date(), "day");

  return (
    <Popover className="relative">
      <Popover.Button>
        <div
          className={clsx("h-10 w-10 rounded-lg border-2", {
            "flex items-center justify-center text-xs font-bold text-zinc-200":
              isToday,
            "border-zinc-800 bg-zinc-900": completedPercentage === 0,
            "border-violet-400 bg-violet-800": completedPercentage >= 100,
            "border-violet-400 bg-violet-700":
              completedPercentage >= 80 && completedPercentage < 100,
            "border-violet-400 bg-violet-600":
              completedPercentage >= 60 && completedPercentage < 80,
            "border-violet-400 bg-violet-500":
              completedPercentage < 60 && completedPercentage > 0,
          })}
        >
          {isToday && "Hoje"}
        </div>
      </Popover.Button>

      <Popover.Panel className="absolute z-10">
        <div className="flex w-52 max-w-md flex-col gap-2 rounded-md bg-zinc-900 p-4 shadow-lg">
          <span className="text-xs font-bold text-zinc-500">{dayFullName}</span>
          <h3 className="text-2xl font-bold text-white"> {dayAndMonth} </h3>

          <ProgressBar progress={completedPercentage} />

          <div className="mt-4 flex flex-col gap-3">
            {data?.possibleHabits && data.possibleHabits.length > 0 ? (
              data.possibleHabits.map((habit, i) => {
                const habitCompleted = data.completedHabits?.find(
                  (completedHabit) => completedHabit === habit.id
                );

                return (
                  <div
                    className="flex flex-row items-center gap-2"
                    key={habit.id}
                  >
                    <input
                      type="checkbox"
                      value={habit.id}
                      disabled={!isToday}
                      onChange={toggleHabitCompletion}
                      defaultChecked={habitCompleted ? true : false}
                      className="h-5 w-5 rounded-md accent-green-600"
                    />
                    <label htmlFor={habit.id}> {habit.title} </label>
                  </div>
                );
              })
            ) : (
              <div className="text-xs font-bold text-zinc-400">
                Sem hábitos para esse dia
              </div>
            )}
          </div>
        </div>
      </Popover.Panel>
    </Popover>
  );
};

export default HabitTile;
