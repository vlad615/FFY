import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { appReducer } from './app-slice'
import { baseApi, saveState } from '@/shared/lib'
import { userReducer } from '@/entities/User'

export const store = configureStore({
  reducer: {
    app: appReducer,
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([baseApi.middleware]),
})
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

store.subscribe(() => {
  saveState('liked', store.getState().user.liked)
})
