import { createAsyncThunk } from "@reduxjs/toolkit"
import { pokemonApi } from "./pokemonAPI"
import { Pokemon } from "./types"

export const fetchPokemonByName = createAsyncThunk<Pokemon, string>(
  "pokemon/getPokemonByName",
  async (name: string, { rejectWithValue }) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)

    const data = await response.json()

    if (response.status < 200 || response.status >= 300) {
      return rejectWithValue(data)
    }

    return data
  }
)
