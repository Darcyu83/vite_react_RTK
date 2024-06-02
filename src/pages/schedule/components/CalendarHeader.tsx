import { format } from "date-fns"

interface IProps {
  todayDateStr: string
}

function CalendarHeader({ todayDateStr }: IProps) {
  return (
    <header className="w-full flex justify-between py-4 px-6">
      <p className="text-3xl">{format(new Date(todayDateStr), "MMMM yyyy")}</p>
      <div className="flex gap-6">
        <div className="text-xs border border-slate-600 border-dashed">
          버튼1 : 일별 선택
        </div>
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
