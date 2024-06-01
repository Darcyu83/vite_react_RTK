import { useState } from "react"

interface IProps {}

type TGender = "female" | "male"

export interface Item {
  name: string
  gender: TGender
}

export interface IData {
  [colId_COL_INDEX: string]: Item[]
}

const dummy: IData = {
  col_0: [{ name: "darcy", gender: "male" }],
  col_1: [{ name: "lucy", gender: "female" }],
  col_2: [
    { name: "david", gender: "female" },
    { name: "daniel", gender: "male" },
  ],
}

function useDndColToCol() {
  const [data, setData] = useState<IData>(dummy)
  const [draggableId, setDraggableId] = useState<string>()
  const [droppableId, sedDroppableId] = useState<string>()

  const adjustItemPosition = (
    colFrom: string,
    colTo: string,
    itemIndex: number
  ) => {}
  return {
    draggableId,
    setDraggableId,
    droppableId,
    sedDroppableId,
    data,
    adjustItemPosition,
  }
}

export default useDndColToCol
