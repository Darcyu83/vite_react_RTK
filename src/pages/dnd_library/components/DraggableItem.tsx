import { DragPreviewImage, useDrag } from "react-dnd"
import { Item } from "../useDndColToCol"

interface IProps {
  colNm: string
  idx: number
  info?: Item
}

function DraggableItem({ colNm, idx, info }: IProps) {
  const itemCategory = idx % 2 === 0 ? "yuds" : "others"

  const [{ isDragging }, drag, preview] = useDrag(
    () => ({
      type: itemCategory,
      item: { colNmFrom: colNm, itemIndex: idx, ...info },
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
        {`Name :: ${info?.name} / Gender :: ${info?.gender}:: ${itemCategory}`}
      </div>
    </>
  )
}

export default DraggableItem
