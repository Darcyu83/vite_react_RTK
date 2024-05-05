import { createSlice } from "@reduxjs/toolkit"
import { Pokemon } from "../services/pokemon/types"
import { fetchPokemonByName } from "../services/pokemon/pokemonThunk"
import { RequestState } from "../services/types"

const initialState = {
  dataByName: {} as Record<string, Pokemon | undefined>,
  statusByName: {} as Record<string, RequestState | undefined>,
}
export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,

  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPokemonByName.pending, (state, action) => {
      state.statusByName[action.meta.arg] = "pending"
    })
    builder.addCase(fetchPokemonByName.fulfilled, (state, action) => {
      const pokeNm = action.meta.arg
      state.statusByName[pokeNm] = "fulfilled"
      state.dataByName[pokeNm] = action.payload
    })
    builder.addCase(fetchPokemonByName.rejected, (state, action) => {
      state.statusByName[action.meta.arg] = "rejected"
    })
  },
})
