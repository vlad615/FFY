import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { LikedFilm } from './user.types'

export const userSlice = createSlice({
  name: 'user',
  initialState: { liked: JSON.parse(localStorage.getItem('liked') || '[]') as LikedFilm[] },
  selectors: {
    selectUser: (state) => state.liked,
  },
  reducers: {
    addFilm: (state, action: PayloadAction<{ film: LikedFilm }>) => {
      state.liked.unshift(action.payload.film)
    },
    removeFilm: (state, action: PayloadAction<{ id: number }>) => {
      const filmIndex = state.liked.findIndex((i) => i.id === action.payload.id)
      if (filmIndex !== -1) {
        state.liked.splice(filmIndex, 1)
      }
    },
  },
})

export const { selectUser } = userSlice.selectors
export const { addFilm, removeFilm } = userSlice.actions

export const userReducer = userSlice.reducer
