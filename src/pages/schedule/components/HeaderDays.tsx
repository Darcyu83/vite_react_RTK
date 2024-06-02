import { format } from "date-fns"

interface IProps {
  type?: "header"
  idx: number
  week: {
    year: number
    month: number
    dayNum: number
  }[]
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

function HeaderDays({ type, idx, week }: IProps) {
  return (
    <div key={"week_" + idx} className="w-full h-full flex border-t border-b">
      {week.map((dateInfo) => {
        const { year, month, dayNum } = dateInfo
        return (
          <div
            key={"week_day_num_" + dateInfo.month + dateInfo.dayNum}
            className={[
              "truncate flex flex-col justify-start items-start flex-1 border border-[--border-color-black] border-l-0 border-t-0 border-b-0 last:border-r-0",
            ].join(" ")}
          >
            <div className={"w-full"}>
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
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default HeaderDays
