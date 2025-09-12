import {
  differenceInDays,
  format,
  isToday,
  isTomorrow,
  parseISO,
} from "date-fns";

export function formatDateForTask(date: string): string {
  const parsedDate = parseISO(date);
  const daysLeft = differenceInDays(parsedDate, new Date());
  const formattedDate = format(parsedDate, "dd/MM/yyyy");

  return countDays(parsedDate, daysLeft, formattedDate);
}

function countDays(
  date: Date,
  daysLeft: number,
  formattedDate: string
): string {
  let duedate;

  if (isToday(date)) {
    duedate = "Today";
  } else if (isTomorrow(date)) {
    duedate = "Tomorrow";
  } else {
    duedate = `${daysLeft + 1} days left - ${formattedDate}`;
  }

  return duedate;
}
