import { format } from "date-fns"
import Day from "./Day"

interface IProps {
  type?: "header"
  idx: number
  week: {
    year: number
    month: number
    dayNum: number
  }[]
}

const dummyTaskDataPerDay: {
  [mm_dd: string]: { taskNm: string; details: string }[]
} = {
  "06-02": [
    { taskNm: "Sam's birthday party", details: "스타필드 고고" },
    { taskNm: "Maple syrup museum2", details: "궁궐" },
    { taskNm: "Maple syrup museum1", details: "궁궐" },
  ],
}

function WeekRow({ type, idx, week }: IProps) {
  return (
    <div key={"week_" + idx} className="w-full h-full flex border-l-0 flex-1">
      {week.map((dateInfo) => {
        const { year, month, dayNum } = dateInfo

        const key = format(new Date(`${year}-${month}-${dayNum}`), "MM-dd")
        const tasks = dummyTaskDataPerDay[key] ?? []
        return (
          <Day
            type={type}
            dateStrMMDD={key}
            dateInfo={{ ...dateInfo, tasks }}
          />
        )
      })}
    </div>
  )
}

export default WeekRow
