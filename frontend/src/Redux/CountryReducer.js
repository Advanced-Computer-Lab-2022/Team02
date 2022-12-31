import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'rate',
  initialState: {
    value: 1,
  },
  reducers: {
    RRate: (state,action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { RRate } = counterSlice.actions

export default counterSlice.reducer