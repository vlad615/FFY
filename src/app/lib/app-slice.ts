import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { theme: localStorage.getItem('theme') || 'root' },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const appReducer = appSlice.reducer
