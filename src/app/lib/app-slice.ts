import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { theme: 'light' },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
