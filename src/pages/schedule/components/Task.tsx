import { DragPreviewImage, useDrag } from "react-dnd"

interface IProps {
  idx: number
  thisDayStr: string
  task: {
    taskNm: string
    details: string
  }
}

function Task({ idx, thisDayStr, task }: IProps) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: "task",
    canDrag: () => {
      return true
    },
    item: { originDayStr: thisDayStr, index: idx, ...task },
    isDragging: (monitor) => {
      return true
    },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() }
    },
  }))

  return (
    <>
      <DragPreviewImage connect={preview} src="/vite.svg" />
      <div
        ref={drag}
        draggable
        className="text-[--text-color-black-intensive] font-medium hover:text-[--hover-color]"
      >
        <p>{task.taskNm}</p>
      </div>
    </>
  )
}

export default Task
