import { getArticleList } from '@/services/api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from '../../store'

// import { fetchCount } from './counterAPI'
export interface ArticleState {
  articleData: API.ArtileListItem[],
  page: number,
  pageSize: number,
  status: 'idle' | 'loading' | 'failed'
}

const initialState: ArticleState = {
  articleData: [],
  page: 1,
  pageSize: 10,
  status: 'idle'
}

export const nextPageAsync = createAsyncThunk(
  '/getArticle/list',
  async (params: API.QueryArticleListParams) => {
    const response = await getArticleList(params)
    return response.data
  }
)
export const getCurrentAsync = createAsyncThunk(
  'currentList',
  async (params: API.QueryArticleListParams) => {
    console.log(params);

    const response = await getArticleList(params)
    return response.data
  }
)




export const articleSlice = createSlice({
  name: 'article',
  initialState,

  reducers: {
    nextPage: (state) => {
      state.page += 1
    },
    prePage: (state) => {
      state.page -= 1
    }
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

export const { nextPage, prePage } = articleSlice.actions

export const selectArticleList = (state: AppState) => state.article.articleData



export default articleSlice.reducer