import React from "react"
import { useGetPokemonByNameQueryWithAPI } from "../../redux/services/pokemon/pokemonAPI"
import useGetPokemonByNameQueryWithThunk from "../../redux/hooks/useGetPokemonByNameQueryWithThunk"

interface IProps {
  name: string
  pollingInterval: number
}

function Pokemon({ name, pollingInterval }: IProps) {
  // const { data, error, isLoading } = useGetPokemonByNameQueryWithAPI(name, {
  //   pollingInterval,
  // })

  const {
    data,
    isError: error,
    isLoading,
  } = useGetPokemonByNameQueryWithThunk({ name })

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>{data.species.name}</h3>
          <hr />
          <img src={data.sprites.front_shiny} alt={data.species.name} />
        </>
      ) : null}
    </>
  )
}

export default Pokemon
