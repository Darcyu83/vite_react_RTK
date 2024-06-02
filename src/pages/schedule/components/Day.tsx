import { format } from "date-fns"
import { useMemo } from "react"

interface IProps {
  type?: "header"
  dateStrMMDD: string
  dateInfo: {
    year: number
    month: number
    dayNum: number
    tasks: {
      taskNm: string
      details: string
    }[]
  }
}

function Day({ type, dateStrMMDD, dateInfo }: IProps) {
  const { year, month, dayNum, tasks } = dateInfo

  //   console.log(`${year}-${month}-${dayNum}`)
  const { isToday, isOutOfThisMonth } = useMemo(() => {
    const today = new Date()
    return {
      isToday: format(today, "MM-dd") === dateStrMMDD,
      isOutOfThisMonth: month !== today.getMonth() + 1,
    }
  }, [dateStrMMDD, month])

  return (
    <div
      key={"week_day_num_" + dateInfo.month + dateInfo.dayNum}
      className={[
        "truncate flex flex-col justify-start items-start flex-1 border border-[--border-color-black] border-t-0 border-l-0 last:border-r-0",

        isOutOfThisMonth && type !== "header"
          ? "bg-[--bg-color-disabled] text-[--text-color-disabled]"
          : "",
      ].join(" ")}
    >
      <div className={"w-full"}>
        {type === "header" && (
          <span
            className="
                        block
                        text-sm sm:text-base lg:text-lg 
                        truncate
                        align-middle
                        text-center 
                        px-2 py-3
                    "
          >
            {`${format(new Date(`${year}-${month}-${dayNum}`), "EEE")}`}
          </span>
        )}

        {type !== "header" && (
          <span
            className={"block text-sm sm:text-sm lg:text-sm truncate px-2 py-3"}
          >
            {/* {`${month}월${dayNum}일`} */}
            <div
              className={
                isToday
                  ? "w-6 h-6 bg-[--primary-color] flex justify-center items-center text-white rounded-full"
                  : ""
              }
            >{`${dayNum}`}</div>

            <div className="flex flex-col gap-1 py-2">
              {tasks.map((task, idx) => {
                return (
                  <div className="text-[--text-color-black-intensive] font-medium hover:text-[--hover-color]">
                    <p>{task.taskNm}</p>
                  </div>
                )
              })}
            </div>
          </span>
        )}
      </div>
    </div>
  )
}

export default Day
