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
    <li
      ref={drag}
      draggable
      className="relative before:content-[''] before:block before:absolute before:border before:border-red-500 before:w-full before:hover:border-slate-600"
    >
      <DragPreviewImage connect={preview} src="/vite.svg" />
      <div className="relative">
        <span className="font-medium hover:text-[--hover-color] text-[--text-color-black-intensive] relative">
          {task.taskNm}
        </span>
      </div>
    </li>
  )
}

export default Task
