import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { TAppDispatch, TRootState } from "./store"

export const useAppDispatch = useDispatch.withTypes<TAppDispatch>()
export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector
