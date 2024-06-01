import DragAndDropOrigin from "./pages/dnd/DragAndDropOrigin"
import DnDWithLib from "./pages/dnd_library/DnDWithLib"
import PokemonList from "./pages/pokemon/PokemonList"
import Schedule from "./pages/schedule"

function App() {
  return (
    <>
      <DnDWithLib />
      <DragAndDropOrigin />
      <Schedule />
      <PokemonList />
    </>
  )
}

export default App
