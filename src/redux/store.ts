import { configureStore } from "@reduxjs/toolkit"
import { pokemonApi } from "./services/pokemon/pokemon"
import { setupListeners } from "@reduxjs/toolkit/query"
import { useDispatch } from "react-redux"

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
})

setupListeners(store.dispatch)

export type TRootState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
