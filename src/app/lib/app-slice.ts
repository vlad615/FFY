import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: { theme: localStorage.getItem('theme') || 'light' },
  selectors: { selectTheme: (state) => state.theme },
  reducers: {
    changeThemeAC: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { changeThemeAC } = appSlice.actions
export const { selectTheme } = appSlice.selectors
export const appReducer = appSlice.reducer
