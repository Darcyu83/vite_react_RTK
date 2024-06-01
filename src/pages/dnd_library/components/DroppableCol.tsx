import { useDrop } from "react-dnd"
import { Item } from "../useDndColToCol"
import DraggableItem from "./DraggableItem"

interface IProps {
  idx: number
  colNm: string
  items: Item[]
  sedDroppableId: (droppableId: string) => void
}

function DroppableCol({ colNm, idx, items, sedDroppableId }: IProps) {
  const acceptableType = idx === 1 ? "others" : "yuds"
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: acceptableType,
      canDrop: (item, monitor) => {
        console.log("yuds ===== ", item, monitor)
        return true
      },

      drop: () => sedDroppableId(colNm),
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
      className={`h-full border border-green-600 flex-1 ${
        isOver ? "opacity-25" : ""
      }
      ${canDrop ? "bg-slate-300" : ""}
        `}
    >
      {colNm}:: {acceptableType}
      {items.map((info, idx) => {
        return <DraggableItem info={info} idx={idx} />
      })}
    </div>
  )
}

export default DroppableCol
