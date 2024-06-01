import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import DraggableItems from "./components/DraggableItems"
import DroppableArea from "./components/DroppableArea"
import useDndColToCol from "./useDndColToCol"

interface IProps {}

function DnDWithLib(props: IProps) {
  const { data, draggableId, setDraggableId, droppableId, sedDroppableId } =
    useDndColToCol()

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="border border-dashed border-red-600 p-10">
        <DroppableArea data={data} />
        <DraggableItems />
      </div>
    </DndProvider>
  )
}

export default DnDWithLib
