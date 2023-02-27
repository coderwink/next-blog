// 文章的reducer 
import { NEXT_PAGE, PRE_PAGE } from "../actions/ArticleAction"


const initialState = {
  article: {
    articleData: [],
    page: 1,
    pageSize: 10
  }
}

type actionType = {
  type: string,
  data: any
}



export default function index(state = initialState, action: actionType) {
  // 查看是否被冻结
  console.log(Object.isFrozen(state));
  const { type, data } = action
  switch (type) {
    case NEXT_PAGE:
      return {
        ...state, article: {
          page: state.article.page + 1,
          data
        }
      }
    case PRE_PAGE:
      return {
        ...state, article: {
          page: state.article.page - 1,
          data
        }
      }
    default: return state
  }
}