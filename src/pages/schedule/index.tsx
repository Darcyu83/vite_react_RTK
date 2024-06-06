import { useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { onSelectPrevNextDayMonth } from "../../components/picker/SelectPrevNextDayMonth/utils"
import Month from "./Month"
import CalendarHeader from "./components/CalendarHeader"
import useScheduleState from "./hooks/useScheduleState"

interface IProps {}

function Schedule(props: IProps) {
  const [dateSelected, setDateSelected] = useState(new Date())

  const scheduleState = useScheduleState()
  // const { monthlyTasksPerDay, setMonthlyTasksPerDay } = useScheduleState()

  const onIncrease = () => {
    setDateSelected(
      onSelectPrevNextDayMonth(dateSelected, "month", "increment")
    )
  }
  const onDecrease = () => {
    setDateSelected(
      onSelectPrevNextDayMonth(dateSelected, "month", "decrement")
    )
  }
  const onSetToday = () => {
    setDateSelected(new Date())
  }

  return (
    <DndProvider key={"dnd_provider"} backend={HTML5Backend}>
      <div className="m-5">
        <CalendarHeader
          dateSelected={dateSelected}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onSetToday={onSetToday}
        />
        <Month dateSelected={dateSelected} scheduleState={scheduleState} />
      </div>
    </DndProvider>
  )
}

export default Schedule
