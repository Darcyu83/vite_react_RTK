import React, { useMemo, useState } from "react"
import {
  formatDateYYYYMMDDWithHyphen,
  getMonth1stOrLastDay,
} from "../../utils/date/date"
import { differenceInDays } from "date-fns"

interface IProps {}

function Schedule(props: IProps) {
  const [todayDateStr, setTodayDateStr] = useState(
    formatDateYYYYMMDDWithHyphen(new Date())
  )

  const { daysOfMonthArr, firstDayOfThisMonth, lastDayOfThisMonth } =
    useMemo(() => {
      const { firstDayOfThisMonth, lastDayOfThisMonth } = getMonth1stOrLastDay(
        new Date(todayDateStr)

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
    }, [todayDateStr])
  return (
    <div className="border-black border m-5 h-96">
      <p className="text-3xl font-bold underline">Hello world!</p>
      {daysOfMonthArr.map((week, idx) => {
        return (
          <div key={"week_" + idx}>
            {week.map((dateInfo) => {
              return (
                <span
                  className="border-rose-500 border-4 m-5 flex"
                  key={"week_day_num_" + dateInfo.month + dateInfo.dayNum}
                >{` ${dateInfo.month}월${dateInfo.dayNum}일`}</span>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default Schedule
