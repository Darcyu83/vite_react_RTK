import { format } from "date-fns"

export const formatDateYYYYMMDDWithHyphen = (date: Date) => {
  return format(date, "yyyy-MM-dd")
}
export const formatDateYYYYMMDDHHMMWithHyphen = (date: Date) => {
  return format(date, "yyyy-MM-dd HH:mm")
}

/**
 *
 */
export const getMonth1stOrLastDay = (date: Date) => {
  const fullYear = date.getFullYear()
  const thisMonthIdx = date.getMonth()

  const firstDayOfThisMonth = new Date(fullYear, thisMonthIdx, 1)
  const lastDayOfThisMonth = new Date(fullYear, thisMonthIdx + 1, 0)

  return { year: fullYear, firstDayOfThisMonth, lastDayOfThisMonth }
}
