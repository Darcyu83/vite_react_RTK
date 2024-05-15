import React, { useMemo, useState } from "react"
import {
  formatDateYYYYMMDDWithHyphen,
  getMonth1stOrLastDay,
} from "../../utils/date/date"
import { differenceInDays } from "date-fns"
import { makeMonthForCalendar } from "../../utils/calendar/calendar"
import MonthlySchedule from "./MonthlySchedule"

interface IProps {}

function Schedule(props: IProps) {
  const [todayDateStr, setTodayDateStr] = useState(
    formatDateYYYYMMDDWithHyphen(new Date())
  )

  return (
    <div>
      <MonthlySchedule todayDateStr={todayDateStr} />
    </div>
  )
}

export default Schedule
