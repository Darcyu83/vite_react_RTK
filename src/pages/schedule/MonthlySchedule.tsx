import { useMemo } from "react"
import { makeMonthForCalendar } from "../../utils/calendar/calendar"

interface IProps {
  todayDateStr: string
}

function MonthlySchedule({ todayDateStr }: IProps) {
  const { daysOfMonthArr, firstDayOfThisMonth, lastDayOfThisMonth } =
    useMemo(() => {
      return makeMonthForCalendar(todayDateStr)
    }, [todayDateStr])
  return (
    <div className="border-black border m-5">
      <p className="text-3xl font-bold underline">왜 안돼!</p>

      <div className="w-full flex flex-col gap-2">
        {daysOfMonthArr.map((week, idx) => {
          return (
            <div key={"week_" + idx} className="w-full flex gap-2">
              {week.map((dateInfo) => {
                return (
                  <div
                    key={"week_day_num_" + dateInfo.month + dateInfo.dayNum}
                    className="   truncate border-emerald-300 border-2 flex flex-col aspect-square justify-start items-start flex-1"
                  >
                    <div className="w-full">
                      <span
                        className="
                        block
                        text-sm sm:text-base lg:text-lg 
                        truncate
                        text-emerald-600 sm:text-lime-500 lg:text-green-700
                    "
                      >
                        {`${dateInfo.month}월${dateInfo.dayNum}일`}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}

        {/* 줄임말 테스트 */}
        <div style={{ width: "100%" }}>
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

export default MonthlySchedule
