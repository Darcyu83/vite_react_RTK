import { addMonths } from "date-fns"
import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Month from "./Month"
import useScheduleState from "./hooks/useScheduleState"

interface IProps {}

function Schedule(props: IProps) {
  const [dateSelected, setDateSelected] = useState(new Date())

  const onChangeDate = (increment: 1 | -1) => {
    setDateSelected(addMonths(dateSelected, increment))
  }
  const scheduleState = useScheduleState()
  // const { monthlyTasksPerDay, setMonthlyTasksPerDay } = useScheduleState()

  return (
    <DndProvider key={"dnd_provider"} backend={HTML5Backend}>
      <div className="m-5">
        <h1>헤더 ----- </h1>
        <button onClick={() => onChangeDate(-1)}>Prev</button>
        <button onClick={() => onChangeDate(1)}>Next</button>

        <Month dateSelected={dateSelected} scheduleState={scheduleState} />
      </div>
    </DndProvider>
  )
}

export default Schedule
