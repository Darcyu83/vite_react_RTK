import { IData } from "../useDndColToCol"
import DroppableCol from "./DroppableCol"

interface IProps {
  data: IData
}

function DroppableArea({ data }: IProps) {
  return (
    <div style={{}}>
      <h1>Droppable 컨테이너</h1>
      <div className="h-96 border border-red-950 flex p-4 gap-2">
        {Object.keys({ ...data }).map((key, idx) => {
          return <DroppableCol colNm={key} idx={idx} items={data[key]} />
        })}
      </div>
    </div>
  )
}

export default DroppableArea
