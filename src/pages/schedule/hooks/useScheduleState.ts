import { useState } from "react"

interface IProps {}

interface IProps {
  type?: "header"
  idx: number
  week: {
    year: number
    month: number
    dayNum: number
  }[]
}

interface ITask {
  year: number
  month: number
  dayNum: number
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

export type TScheduleState = ReturnType<typeof useScheduleState>

function useScheduleState() {
  const [monthlyTasksPerDay, setMonthlyTasksPerDay] =
    useState(dummyTaskDataPerDay)

  return { monthlyTasksPerDay, setMonthlyTasksPerDay }
}

export default useScheduleState
