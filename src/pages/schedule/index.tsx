import { useState } from "react"
import { formatDateYYYYMMDDWithHyphen } from "../../utils/date/date"
import Month from "./Month"

interface IProps {}

function Schedule(props: IProps) {
  const [todayDateStr, setTodayDateStr] = useState(
    formatDateYYYYMMDDWithHyphen(new Date())
  )

  return (
    <div className="m-5">
      <h1>헤더 ----- </h1>

      <Month todayDateStr={todayDateStr} />
    </div>
  )
}

export default Schedule
