// @ts-ignore
/* eslint-disable */

declare namespace API {
  interface commonType {
    success?: string;
    message?: string;
  }
  type Result<T> = {
    success: boolean;
    message: string;
    data: T;
  }

  type CurrentUser = {
    userName?: string;
    userAccount?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginParams = {
    userAccount?: string;
    userPwd?: string;
  };
  type LoginResultData = {
    userAccount: string;
    userId: string;
    userName: string;
  };
  type LoginResult = {
    success?: string;
    message?: string;
    data?: LoginResultData;
    loginType?: string;
  };

  type AddCategoryParams = {
    name: string;
    resume: string;
    coverImg: string;
  };

  type CategoryItem = AddCategoryParams & { id: string };

  type CateGroyList = commonType & { data: CategoryItem[] };

  type QueryArticleListParams = {
    pageIndex?: number;
    pageSize?: number;
    articleClassifyId?: string;
  };

  type ArtileListItem = {
    id?: number;
    name?: string;
    cid?: number;
    resume?: string;
    coverImg?: string;
    author?: string;
    content: string;
    status?: number;
    createTime?: string;
    updateTime?: string;
  };

  type pagingResult<T> = {
    count: number;
    list: T[];
  };

  type Log = {
    date: string;
    resume: string;
  }

  type QueryArticleResult = commonType & { data: pagingResult<ArtileListItem> };
}
