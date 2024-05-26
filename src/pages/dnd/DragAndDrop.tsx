import React from "react"

interface IProps {}

function DragAndDrop(props: IProps) {
  const onDragStart = (e: React.DragEvent, id: string) => {
    if (!e.dataTransfer) return

    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("Text", id)
    e.dataTransfer.setDragImage(e.currentTarget, 100, 100)
  }

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault()
  }
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const onDrop = (e: React.DragEvent) => {
    if (!e.dataTransfer) return
    const id = e.dataTransfer.getData("Text")
    e.currentTarget.appendChild(document.getElementById(id)!)
  }

  return (
    <div className={"flex "}>
      <div
        id="Droppable"
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDrop={(e) => {
          onDrop(e)
        }}
        className="h-96 w-96 border border-red-400 hover:bg-red-400/[.1]"
      >
        Drop Area
      </div>

      <div>
        <div
          draggable
          id="draggable1"
          onDragStart={(e) => {
            onDragStart(e, "draggable1")
          }}
          className="h-16 align-middle bg-lime-100"
        >
          draggable Item 1
        </div>
      </div>
      <div draggable id="draggable2" className="h-16 bg-slate-100 align-middle">
        draggable Item 2
      </div>
    </div>
  )
}

export default DragAndDrop
