import { createSlice } from "@reduxjs/toolkit"
import { User } from "../services/users/types"
import { fetchUserById, updateUser } from "../services/users/usersAPI"

interface UsersState {
  error: string | null | undefined
  entities: User[]
  loading: "idle" | "pending" | "succeeded" | "failed"
}

const initialState = {
  entities: [],
  error: null,
  loading: "idle",
} satisfies UsersState as UsersState

// const initialState = {
//   entities: [] as User[],
//   loading: "idle",
//   currentRequestId: undefined,
//   error: null,
// }

const users = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, { payload }) => {
      state.entities.push(payload as User)
    })
    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.entities.push(payload)
    })
  },
})
