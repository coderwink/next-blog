


import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import ArticleSlice from './reducers/ArticleSlice'
import classifySlice from './reducers/classifySlice'
import configSlice from './reducers/configSlice'
export function makeStore() {
  return configureStore({
    reducer: { article: ArticleSlice, classify: classifySlice, config: configSlice },
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