import React, { useState } from "react"
import { useGetPokemonByNameQuery } from "../../redux/services/pokemon/pokemon"
import Pokemon from "./Pokemon"

interface IProps {}

const pokemonNms = ["bulbasaur", "pikachu", "ditto", "bulbasaur"]

function PokemonList(props: IProps) {
  const [pollingInterval, setPollingInterval] = useState(0)
  // const { data, error, isLoading } = useGetPokemonByNameQuery("bulbasaur")

  return (
    <div style={{}}>
      <select
        onChange={(change) => setPollingInterval(Number(change.target.value))}
      >
        <option value={0}>Off</option>
        <option value={1000}>1s</option>
        <option value={5000}>5s</option>
      </select>

      {pokemonNms.map((pokemon) => (
        <Pokemon name={pokemon} pollingInterval={pollingInterval} />
      ))}
    </div>
  )
}

export default PokemonList
