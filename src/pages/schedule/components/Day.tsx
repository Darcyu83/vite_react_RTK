import { format } from "date-fns"
import { useMemo } from "react"
import { useDrop } from "react-dnd"
import { TScheduleState } from "../hooks/useScheduleState"
import Task from "./Task"

interface IProps {
  type?: "header"
  thisDayStr: string
  dateInfo: {
    year: number
    month: number
    dayNum: number
    tasks: {
      taskNm: string
      details: string
    }[]
  }

  setMonthlyTasksPerDay: TScheduleState["setMonthlyTasksPerDay"]
}

function Day({ type, thisDayStr, dateInfo, setMonthlyTasksPerDay }: IProps) {
  const { year, month, dayNum, tasks } = dateInfo

  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: "task",
    canDrop: (
      item: {
        originDayStr: string
        index: number
        taskNm: string
        details: string
      },
      monitor
    ) => {
      console.log(item)
      setMonthlyTasksPerDay((curr) => {
        const copied = { ...curr }

        copied[item.originDayStr].splice(item.index, 1)

        copied[thisDayStr] = []
        copied[thisDayStr].concat({
          taskNm: item.taskNm,
          details: item.details,
        })

        return copied
      })
      return true
    },
    drop: (item) => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  //   console.log(`${year}-${month}-${dayNum}`)
  const { isToday, isOutOfThisMonth } = useMemo(() => {
    const today = new Date()
    return {
      isToday: format(today, "MM-dd") === thisDayStr,
      isOutOfThisMonth: month !== today.getMonth() + 1,
    }
  }, [thisDayStr, month])

  return (
    <div
      ref={drop}
      key={"week_day_num_" + dateInfo.month + dateInfo.dayNum}
      className={[
        "truncate flex flex-col justify-start items-start flex-1 border border-[--border-color-black] border-t-0 border-l-0 last:border-r-0",

        isOutOfThisMonth && type !== "header"
          ? "bg-[--bg-color-disabled] text-[--text-color-disabled]"
          : "",
      ].join(" ")}
    >
      <div className={"w-full"}>
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
                <Task
                  key={"task_" + task.taskNm}
                  idx={idx}
                  thisDayStr={thisDayStr}
                  task={task}
                />
              )
            })}
          </div>
        </span>
      </div>
    </div>
  )
}

export default Day
