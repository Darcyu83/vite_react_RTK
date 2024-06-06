import { addDays, addMonths } from "date-fns"

export const onSelectPrevNextDayMonth = (
  targetDate: Date,
  type: "month" | "day",
  direction: "increment" | "decrement"
) => {
  const offset = direction === "increment" ? 1 : -1

  if (type === "month") {
    return addMonths(targetDate, offset)
  } else {
    return addDays(targetDate, offset)
  }
}
