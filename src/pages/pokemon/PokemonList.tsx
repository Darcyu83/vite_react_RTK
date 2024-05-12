import React, { useState } from "react"
import { pokemonApi } from "../../redux/services/pokemon/pokemonAPI"
import Pokemon from "./Pokemon"
import { useSelector } from "react-redux"
import { useAppSelector } from "../../redux/storeHooks"

interface IProps {}

const pokemonNms = ["bulbasaur", "pikachu", "ditto", "bulbasaur"]

function PokemonList(props: IProps) {
  const [pollingInterval, setPollingInterval] = useState(0)
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur")

  const { queries, config, mutations, provided, subscriptions } =
    useAppSelector((state) => state.pokemonApi)

  console.log(queries, config, mutations, provided, subscriptions)
  return (
    <div style={{}}>
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>

      {pokemonNms.map((pokemon, idx) => (
        <Pokemon
          key={"poke_name_" + pokemon + idx}
          name={pokemon}
          pollingInterval={pollingInterval}
        />
      ))}
    </div>
  )
}

export default PokemonList
