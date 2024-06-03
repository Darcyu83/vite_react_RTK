import { format } from "date-fns"
import { TScheduleState } from "../hooks/useScheduleState"
import Day from "./Day"

interface IProps {
  type?: "header"
  idx: number
  week: {
    year: number
    month: number
    dayNum: number
  }[]

  scheduleState: TScheduleState
}

function WeekRow({ type, idx, week, scheduleState }: IProps) {
  const { monthlyTasksPerDay, setMonthlyTasksPerDay } = scheduleState
  return (
    <div key={"week_" + idx} className="w-full h-full flex border-l-0 flex-1">
      {week.map((dateInfo) => {
        const { year, month, dayNum } = dateInfo

        const key = format(new Date(`${year}-${month}-${dayNum}`), "MM-dd")
        const tasks = scheduleState.monthlyTasksPerDay[key] ?? []
        return (
          <Day
            type={type}
            thisDayStr={key}
            dateInfo={{ ...dateInfo, tasks }}
            setMonthlyTasksPerDay={setMonthlyTasksPerDay}
          />
        )
      })}
    </div>
  )
}

export default WeekRow
