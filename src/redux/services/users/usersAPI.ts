import { createAsyncThunk } from "@reduxjs/toolkit"
import { UpdateUserResponse, User } from "./types"
import { ValidationErrors } from "../types"
import { AxiosError } from "axios"

export declare const userAPI: {
  fetchUserById<Response>(userId: number): Promise<{ data: Response }>
  updateById<Response>(id: number, fields: {}): Promise<{ data: Response }>
}

export const fetchUserById = createAsyncThunk(
  "users/fetchByIdStatus",
  async (userId: number, thunkAPI) => {
    const response = await userAPI.fetchUserById(userId)

    return response.data
  }
)

export const updateUser = createAsyncThunk<
  User,
  { id: string } & Partial<User>,
  { rejectValue: ValidationErrors }
>("users/update", async (userData, { rejectWithValue }) => {
  try {
    const { id, ...fields } = userData

    const response = await userAPI.updateById<UpdateUserResponse>(id, fields)
    return response.data.user
  } catch (error) {
    const err = error as AxiosError<ValidationErrors>
    if (!err.response) throw err

    return rejectWithValue(err.response.data)
  }
})
