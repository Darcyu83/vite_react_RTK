import { useMemo } from "react"
import { makeMonthForCalendar } from "../../utils/calendar/calendar"
import CalendarHeader from "./components/CalendarHeader"
import WeekRow from "./components/WeekRow"

interface IProps {
  todayDateStr: string
}

function Month({ todayDateStr }: IProps) {
  const { daysOfMonthArr, firstDayOfThisMonth, lastDayOfThisMonth } =
    useMemo(() => {
      return makeMonthForCalendar(todayDateStr)
    }, [todayDateStr])

  return (
    <div className="border border-[--border-color-black] min-h-dvh h-full rounded flex flex-col">
      <CalendarHeader todayDateStr={todayDateStr} />

      <div className="w-full h-full flex flex-col">
        {daysOfMonthArr.map((week, idx) => {
          return (
            <>
              {idx === 0 && <WeekRow type="header" idx={idx} week={week} />}

              <WeekRow idx={idx} week={week} />
            </>
          )
        })}

        {/* 줄임말 테스트 */}
        <div style={{ width: "100%", height: "min-content" }}>
          <p
            className="
            
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
