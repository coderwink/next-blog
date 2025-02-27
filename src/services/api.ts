import axios from "./request";
import Http from './index';
const request = new Http()

/** 获取文章分类列表 */
export async function getCategoryList(body?: any, options?: { [key: string]: any }) {
  return request.get<API.CateGroyList>('/article/categoryList', {
    method: 'GET',
    body: body,
    ...(options || {}),
  })
}

/** 获取文章列表 */
export async function getArticleList(body?: API.QueryArticleListParams, options?: { [key: string]: any }) {
  return request.get<API.ArtileListItem[]>('/article/articleList', {
    method: 'GET',
    query: body,
    ...(options || {}),
  });
}

/** 通过id查询文章详情 */
export async function getArticleDetail(body?: { id: number }, options?: { [key: string]: any }) {
  return request.get<API.ArtileListItem>('/article/detail', {
    method: 'GET',
    query: body,
    ...(options || {}),
  })
}

export async function updateArticle(body?: any, options?: { [key: string]: any }) {
  return request.post('article/update', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  })
}