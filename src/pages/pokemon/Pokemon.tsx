import React from "react"
import { useGetPokemonByNameQuery } from "../../redux/services/pokemon/pokemon"

interface IProps {
  name: string
  pollingInterval: number
}

function Pokemon({ name, pollingInterval }: IProps) {
  const { data, error, isLoading } = useGetPokemonByNameQuery(name, {
    pollingInterval,
  })
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
