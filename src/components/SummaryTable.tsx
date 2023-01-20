import { useSession } from "next-auth/react";
import React from "react";
import { api } from "../utils/api";
import { generateDayFromYearBeginning } from "../utils/generateDateFromYearBeginning";
import HabitTile from "./HabitTile";

const SummaryTable = () => {
  const { status, data: sessionData } = useSession();

  const daysOfWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  const summaryDates = generateDayFromYearBeginning();

  const minimumSummaryDateSize = 18 * 7; // 18 weeks

  const amountOfDatesToFill = minimumSummaryDateSize - summaryDates.length;

  const { data, isFetching, isLoading } = api.habits.getSummary.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      enabled: !!sessionData,
    }
  );

  console.log(data);

  return (
    <div className="flex w-full gap-1">
      <div className="grid grid-rows-7 gap-3">
        {daysOfWeek.map((day, i) => (
          <div
            className="flex h-10 w-10 items-center justify-center text-xl font-bold text-zinc-400"
            key={day + i}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-flow-col grid-rows-7 gap-2">
        {summaryDates.map((date, i) => (
          <HabitTile key={date.toISOString()} />
        ))}

        {amountOfDatesToFill > 0 &&
          Array.from({ length: amountOfDatesToFill }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-10 cursor-not-allowed rounded-lg border-2 border-zinc-800 bg-zinc-900"
            />
          ))}
      </div>
    </div>
  );
};

export default SummaryTable;
