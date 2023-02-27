/**
 * Action 常量
 */

export const NEXT_PAGE = 'NEXT_PAGE'
export const PRE_PAGE = 'PRE_PAGE'




/**
 * Action 生成器
 */

export function nextPage(data: Record<any, any>) {
  return {
    type: NEXT_PAGE,
    data,
  }
}

// 上一页面存在缓存数据是否能去 缓存中获取更新 是个问题
export function prePage(data: Record<any, any>) {
  return {
    type: PRE_PAGE,
    data,
  }
}