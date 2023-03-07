import { getArticleList } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'// import { fetchCount } from './counterAPI'

export interface ConfigState {
  theme: modelType;
  status?: 'idle' | 'loading' | 'failed'
}

const initialState: ConfigState = {
  // @ts-ignore
  theme: 'light',
  status: 'idle'
}

export const ConfigSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<modelType>) => {
      state.theme = action.payload
    },
  }
})


export const { setTheme } = ConfigSlice.actions

export const getTheme = (state: AppState) => state.config.theme

export default ConfigSlice.reducer