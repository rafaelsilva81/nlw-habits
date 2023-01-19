import dayjs from "dayjs";

export function generateDayFromYearBeginning() {
  const firsyDayOfYear = dayjs().startOf("year");
  const today = dayjs();

  const dates = [];
  let compareDate = firsyDayOfYear;

  while (compareDate.isBefore(today)) {
    dates.push(compareDate.toDate());
    compareDate = compareDate.add(1, "day");
  }

  return dates;
}
