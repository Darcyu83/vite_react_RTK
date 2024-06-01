import { DragPreviewImage, useDrag } from "react-dnd"
import { Item } from "../useDndColToCol"

interface IProps {
  idx: number
  info?: Item
}

function DraggableItem({ idx, info }: IProps) {
  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: "haha ",
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    []
  )

  if (!info) return
  return (
    <>
      <DragPreviewImage connect={preview} src={"/vite.svg"} />
      <div
        ref={drag}
        id={`item_${idx}`}
        draggable
        className={`h-8 border border-green-600 flex-1 flex items-center ${
          isDragging ? "text-red-600" : "text-inherit"
        }`}
      >
        {`Name :: ${info?.name} / Gender :: ${info?.gender}`}
      </div>
    </>
  )
}

export default DraggableItem
