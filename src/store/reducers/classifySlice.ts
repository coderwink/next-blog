import { getArticleList } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'// import { fetchCount } from './counterAPI'

export interface ClassifyState {
  name: string;
  status?: 'idle' | 'loading' | 'failed'

}

const initialState: ClassifyState = {
  name: '',
  status: 'idle'
}

export const nextPageAsync = createAsyncThunk(
  '/getArticle/list',
  async (params: API.QueryArticleListParams) => {
    const response = await getArticleList(params)
    return response
  }
)
export const getCurrentAsync = createAsyncThunk(
  'currentList',
  async (params: API.QueryArticleListParams) => {
    console.log(params);

    const response = await getArticleList(params)
    return response
  }
)


export const classifySlice = createSlice({
  name: 'classify',
  initialState,

  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    },

  },
  extraReducers: (builder) => {
    builder
      .addCase(nextPageAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(nextPageAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        console.log(action);
        // state.value += action.payload
      })
  },
})

export const { setName } = classifySlice.actions



export const selectArticleList = (state: AppState) => state.article.articleData



export default classifySlice.reducer