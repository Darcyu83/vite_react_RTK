import { format } from "date-fns"
import { useMemo } from "react"
import { useDrop } from "react-dnd"
import { TScheduleState } from "../hooks/useScheduleState"
import Task from "./Task"

interface IProps {
  type?: "header"
  thisDayStr: string
  isOutOfThisMonth: boolean
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

function Day({
  type,
  thisDayStr,
  isOutOfThisMonth,
  dateInfo,
  setMonthlyTasksPerDay,
}: IProps) {
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
      return true
    },
    drop: (item) => {
      setMonthlyTasksPerDay((curr) => {
        if (item.originDayStr === thisDayStr) return curr

        const copied = { ...curr }
        copied[item.originDayStr].splice(item.index, 1)

        if (!copied[thisDayStr]) copied[thisDayStr] = []

        copied[thisDayStr] = [
          ...copied[thisDayStr],
          {
            taskNm: item.taskNm,
            details: item.details,
          },
        ]

        return copied
      })
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }))

  //   console.log(`${year}-${month}-${dayNum}`)
  const { isToday } = useMemo(() => {
    const today = new Date()
    return {
      isToday: format(today, "MM-dd") === thisDayStr,
    }
  }, [thisDayStr])

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
          <div
            className={
              isToday
                ? "w-6 h-6 bg-[--primary-color] flex justify-center items-center text-white rounded-full"
                : ""
            }
          >{`${dayNum}`}</div>

          <ul
            role="list"
            className="flex flex-col gap-1 py-2 marker:text-sky-400 list-disc pl-5 space-y-3"
          >
            {tasks.map((task, idx) => {
              return (
                <Task
                  key={"task_" + idx + task.taskNm}
                  idx={idx}
                  thisDayStr={thisDayStr}
                  task={task}
                />
              )
            })}
          </ul>
        </span>
      </div>
    </div>
  )
}

export default Day
