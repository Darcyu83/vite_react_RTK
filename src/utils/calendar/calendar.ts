import { differenceInDays } from "date-fns"
import { getMonth1stOrLastDay } from "../date/date"

export const makeMonthForCalendar = (date: string) => {
  const { firstDayOfThisMonth, lastDayOfThisMonth } = getMonth1stOrLastDay(
    new Date(date)

    // new Date("2024-03-15")
  )

  const comparedLastDay = new Date(lastDayOfThisMonth)
  comparedLastDay.setDate(comparedLastDay.getDate() + 1)
  const diffDays = differenceInDays(comparedLastDay, firstDayOfThisMonth)
  const firstDayIdx = firstDayOfThisMonth.getDay()
  const daysOfMonth: { month: number; dayNum: number }[][] = []
  let weekNum = 0
  let isFirstWeek = true

  Array.from({ length: Math.abs(diffDays) }, (_, dayIdx) => {
    if (!daysOfMonth[weekNum]) daysOfMonth[weekNum] = []

    if (isFirstWeek && daysOfMonth[weekNum].length === 0) {
      const firstDay = new Date(firstDayOfThisMonth)
      firstDay.setDate(firstDay.getDate() - firstDayIdx)
      let lastDayNumOfPreviousMonth = firstDay.getDate()
      for (let i = firstDayIdx; i > 0; i--) {
        daysOfMonth[weekNum].push({
          month: firstDayOfThisMonth.getMonth(),
          dayNum: lastDayNumOfPreviousMonth,
        })

        lastDayNumOfPreviousMonth++
      }
    }

    daysOfMonth[weekNum].push({
      month: firstDayOfThisMonth.getMonth() + 1,
      dayNum: dayIdx + 1,
    })

    if (dayIdx === diffDays - 1) {
      let dayStartOfMonth = 1
      const lastDayNum = lastDayOfThisMonth.getDay()
      for (let i = 0; i < 7 - (lastDayNum + 1); i++) {
        daysOfMonth[weekNum].push({
          month: firstDayOfThisMonth.getMonth() + 2,
          dayNum: dayStartOfMonth,
        })
        dayStartOfMonth++
      }
    }
    if ((firstDayIdx + dayIdx + 1) % 7 === 0) {
      if (isFirstWeek) isFirstWeek = false
      weekNum++
    }
  })

  return {
    daysOfMonthArr: daysOfMonth,
    firstDayOfThisMonth,
    lastDayOfThisMonth,
  }
}
