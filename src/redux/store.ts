import { configureStore } from "@reduxjs/toolkit"
import { pokemonApi } from "./services/pokemon/pokemonAPI"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"
import { pokemonSlice } from "./slices/pokemon"

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
    pokemon: pokemonSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
