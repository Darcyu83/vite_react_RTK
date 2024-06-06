import DragAndDropOrigin from "./pages/dnd/DragAndDropOrigin"
import PokemonList from "./pages/pokemon/PokemonList"
import Schedule from "./pages/schedule"

function App() {
  return (
    <>
      {/* <DnDWithLib /> */}
      <DragAndDropOrigin />
      <Schedule />
      <PokemonList />
    </>
  )
}

export default App
