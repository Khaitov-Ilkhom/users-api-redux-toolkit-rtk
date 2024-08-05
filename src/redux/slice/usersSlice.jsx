import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  users: localStorage.getItem("user") || []
}

const allSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    user: (state, action) => {
      console.log(action.payload)
    }
  }
})

export const {user} = allSlice.actions
export const reducer = allSlice.reducer