interface IProps {
  onIncrease: () => void
  onDecrease: () => void
  onSetToday: () => void
}

function SelectPrevNextDayMonth({
  onIncrease,
  onDecrease,
  onSetToday,
}: IProps) {
  return (
    <div className="flex gap-4 h-fit justify-center">
      <button className="" onClick={onDecrease}>
        {`< `}Prev
      </button>
      <button
        className="px-4 border-x-2 border-[--border-color-black]"
        onClick={onSetToday}
      >
        Today
      </button>
      <button onClick={onIncrease}>Next {` >`}</button>
    </div>
  )
}

export default SelectPrevNextDayMonth
