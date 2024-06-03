import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { formatDateYYYYMMDDWithHyphen } from "../../utils/date/date"
import Month from "./Month"
import useScheduleState from "./hooks/useScheduleState"

interface IProps {}

function Schedule(props: IProps) {
  const [todayDateStr, setTodayDateStr] = useState(
    formatDateYYYYMMDDWithHyphen(new Date())
  )

  const scheduleState = useScheduleState()
  // const { monthlyTasksPerDay, setMonthlyTasksPerDay } = useScheduleState()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="m-5">
        <h1>헤더 ----- </h1>

        <Month todayDateStr={todayDateStr} scheduleState={scheduleState} />
      </div>
    </DndProvider>
  )
}

export default Schedule
