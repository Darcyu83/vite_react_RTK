import React, { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../storeHooks"
import { fetchPokemonByName } from "../services/pokemon/pokemonThunk"

interface IProps {
  name: string
}

function useGetPokemonByNameQueryWithThunk({ name }: IProps) {
  const dispatch = useAppDispatch()
  const status = useAppSelector((state) => state.pokemon.statusByName[name])
  const data = useAppSelector((state) => state.pokemon.dataByName[name])

  useEffect(() => {
    if (status === undefined) {
      dispatch(fetchPokemonByName(name))
    }

    // console.log("useGetPokemonByNameQueryWithThunk :: ", status, data)
  }, [status, name, dispatch])

  const isUninitialized = status === undefined
  const isLoading = status === "pending" || status === undefined
  const isError = status === "rejected"
  const isSuccess = status === "fulfilled"

  return {
    data,
    isLoading,
    isUninitialized,
    isError,
    isSuccess,
  }
}

export default useGetPokemonByNameQueryWithThunk
