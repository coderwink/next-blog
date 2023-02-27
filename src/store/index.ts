

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from '../pages/test/counterSlice'
import ArticleSlice from './reducers/ArticleSlice'
export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, article: ArticleSlice },
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store