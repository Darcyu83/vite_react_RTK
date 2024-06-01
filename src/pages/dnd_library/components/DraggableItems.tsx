import DraggableItem from "./DraggableItem"

interface IProps {}

function DraggableItems(props: IProps) {
  return (
    <div style={{}}>
      <h1>Draggable 아이템</h1>

      <div className="h-auto border border-red-950 flex  p-4 gap-2">
        {[...Array(5)].map((_, idx) => {
          return <DraggableItem idx={idx} />
        })}
      </div>
    </div>
  )
}

export default DraggableItems
