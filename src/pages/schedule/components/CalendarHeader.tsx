import { format } from "date-fns"
import SelectPrevNextDayMonth from "../../../components/picker/SelectPrevNextDayMonth/SelectPrevNextDayMonth"

interface IProps {
  dateSelected: Date
  onIncrease: () => void
  onDecrease: () => void
  onSetToday: () => void
}

function CalendarHeader({
  onIncrease,
  onDecrease,
  dateSelected,
  onSetToday,
}: IProps) {
  return (
    <header className="w-full flex justify-between py-4 px-6">
      <div className="flex justify-center relative before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 ">
        <p className="text-3xl relative px-8 py-1 text-white font-semibold">
          {format(dateSelected, "MMMM yyyy")}
        </p>
      </div>
      <div className="flex gap-6">
        <SelectPrevNextDayMonth
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onSetToday={onSetToday}
        />
        <div className="text-xs border border-slate-600 border-dashed">
          버튼2 : 화면 전환 (월간) (일간)
        </div>
        <div className="text-xs border border-slate-600 border-dashed">
          버튼3 : 이벤트 추가
        </div>
      </div>
    </header>
  )
}

export default CalendarHeader
