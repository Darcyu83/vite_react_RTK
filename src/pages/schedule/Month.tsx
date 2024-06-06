import { useMemo } from "react"
import { makeMonthForCalendar } from "../../utils/calendar/calendar"
import HeaderDays from "./components/TableHeaderDays"
import WeekRow from "./components/WeekRow"
import { TScheduleState } from "./hooks/useScheduleState"

interface IProps {
  dateSelected: Date

  scheduleState: TScheduleState
}

function Month({ dateSelected, scheduleState }: IProps) {
  const { daysOfMonthArr, firstDayOfThisMonth, lastDayOfThisMonth } =
    useMemo(() => {
      return makeMonthForCalendar(dateSelected)
    }, [dateSelected])

  return (
    <div className="border border-[--border-color-black] min-h-dvh h-full rounded flex flex-col border-b-0 border-r-0">
      <HeaderDays idx={0} week={daysOfMonthArr[0]} />

      <div className="w-full h-full flex flex-col flex-1">
        {daysOfMonthArr.map((week, idx) => {
          return (
            <WeekRow
              key={"week_row_" + idx}
              idx={idx}
              week={week}
              dateSelected={dateSelected}
              scheduleState={scheduleState}
            />
          )
        })}

        {/* 줄임말 테스트 */}
        <div style={{ width: "100%", height: "min-content" }}>
          <p
            className=" border-b border-r
                        rounded-br
            
                        text-sm sm:text-base lg:text-lg 
                        text-ellipsis
                        whitespace-nowrap
                        overflow-hidden
                        text-emerald-600 sm:text-lime-500 lg:text-green-700

                    
                    "
          >
            The longest word in any of the major English language dictionaries
            is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers
            to a lung disease contracted from the inhalation of very fine silica
            particles, specifically from a volcano; medically, it is the same as
            silicosis.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Month
