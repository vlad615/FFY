import { createSlice } from '@reduxjs/toolkit'

const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: localStorage.getItem('theme') === 'dark' ? 'dark' : ('light' as ThemeMode),
    error: null as ErrorStatus,
  },
  selectors: { selectTheme: (state) => state.theme, selectError: (state) => state.error },
  reducers: (create) => ({
    changeThemeAC: (state, action) => {
      state.theme = action.payload
    },
    changeErrorStatus: create.reducer<{ error: ErrorStatus }>((state, action) => {
      state.error = action.payload.error
    }),
  }),
})

export const { changeThemeAC, changeErrorStatus } = appSlice.actions
export const { selectTheme, selectError } = appSlice.selectors
export const appReducer = appSlice.reducer

export type ThemeMode = 'dark' | 'light'
export type ErrorStatus = null | string
