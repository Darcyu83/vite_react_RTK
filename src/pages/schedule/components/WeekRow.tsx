import { format } from "date-fns"
import { TScheduleState } from "../hooks/useScheduleState"
import Day from "./Day"

interface IProps {
  type?: "header"
  dateSelected: Date
  idx: number
  week: {
    year: number
    month: number
    dayNum: number
  }[]

  scheduleState: TScheduleState
}

function WeekRow({ type, idx, dateSelected, week, scheduleState }: IProps) {
  const { monthlyTasksPerDay, setMonthlyTasksPerDay } = scheduleState

  return (
    <div key={"week_" + idx} className="w-full h-full flex border-l-0 flex-1">
      {week.map((dateInfo) => {
        const { year, month, dayNum } = dateInfo

        console.log("yuds ===== ", year, month, dayNum)

        const key = format(new Date(`${year}-${month}-${dayNum}`), "MM-dd")
        const tasks = scheduleState.monthlyTasksPerDay[key] ?? []
        const isOutOfThisMonth = month !== dateSelected.getMonth() + 1
        return (
          <Day
            key={key}
            type={type}
            thisDayStr={key}
            dateInfo={{ ...dateInfo, tasks }}
            isOutOfThisMonth={isOutOfThisMonth}
            setMonthlyTasksPerDay={setMonthlyTasksPerDay}
          />
        )
      })}
    </div>
  )
}

export default WeekRow
