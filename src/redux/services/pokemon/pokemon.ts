import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Pokemon } from "./types"

const baseUrl = "https://pokeapi.co/api/v2/"

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<Pokemon, string>({
      query: (name) => `pokemon/${name}`,
    }),
  }),
})

export const { useGetPokemonByNameQuery } = pokemonApi
