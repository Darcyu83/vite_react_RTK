import { useDrop } from "react-dnd"
import { Item } from "../useDndColToCol"
import DraggableItem from "./DraggableItem"

interface IProps {
  idx: number
  colNm: string
  items: Item[]
}

function DroppableCol({ colNm, idx, items }: IProps) {
  const aa = () => {
    return true
  }
  const bb = () => {}
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "drag",
      canDrop: aa,
      drop: bb,
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    []
  )
  return (
    <div
      ref={drop}
      id={colNm}
      className="h-full border border-green-600 flex-1"
    >
      {colNm}
      {items.map((info, idx) => {
        return <DraggableItem info={info} idx={idx} />
      })}
    </div>
  )
}

export default DroppableCol
