import { addDays, differenceInDays, subDays } from "date-fns"
import { getMonth1stOrLastDay } from "../date/date"

export const makeMonthForCalendar = (date: string | Date) => {
  const { year, firstDayOfThisMonth, lastDayOfThisMonth } =
    getMonth1stOrLastDay(
      typeof date === "string" ? new Date(date) : date

      // new Date("2024-03-15")
    )

  const comparedLastDay = new Date(lastDayOfThisMonth)
  comparedLastDay.setDate(comparedLastDay.getDate() + 1)
  const diffDays = differenceInDays(comparedLastDay, firstDayOfThisMonth)
  const firstDayIdx = firstDayOfThisMonth.getDay()
  const daysOfMonth: { year: number; month: number; dayNum: number }[][] = []
  let weekNum = 0
  let isFirstWeek = true

  Array.from({ length: Math.abs(diffDays) }, (_, dayIdx) => {
    if (!daysOfMonth[weekNum]) daysOfMonth[weekNum] = []

    if (isFirstWeek && daysOfMonth[weekNum].length === 0) {
      for (let i = firstDayIdx; i > 0; i--) {
        const dayEarlierThanFirstDay = subDays(firstDayOfThisMonth, i)
        daysOfMonth[weekNum].push({
          year: year,
          month: dayEarlierThanFirstDay.getMonth() + 1,
          dayNum: dayEarlierThanFirstDay.getDate(),
        })
      }
    }

    daysOfMonth[weekNum].push({
      year: year,
      month: firstDayOfThisMonth.getMonth() + 1,
      dayNum: dayIdx + 1,
    })
    const lastDayNum = lastDayOfThisMonth.getDay()

    console.log(" lastDayNum ", lastDayOfThisMonth, lastDayNum)
    if (dayIdx === diffDays - 1 && lastDayNum !== 6) {
      let dayStartOfNextMonth = 1

      const firstDayOfNextMonth = addDays(lastDayOfThisMonth, 1)
      for (let i = 0; i < 7 - (lastDayNum + 1); i++) {
        daysOfMonth[weekNum].push({
          year: year,
          month: firstDayOfNextMonth.getMonth() + 1,
          dayNum: dayStartOfNextMonth,
        })
        dayStartOfNextMonth++
      }
    }
    if ((firstDayIdx + dayIdx + 1) % 7 === 0) {
      if (isFirstWeek) isFirstWeek = false
      weekNum++
    }
  })

  return {
    year,
    daysOfMonthArr: daysOfMonth,
    firstDayOfThisMonth,
    lastDayOfThisMonth,
  }
}
