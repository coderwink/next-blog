import React, { useEffect, useRef, useState } from 'react';

import { throttle } from 'lodash';
import Image from 'next/image';
import { useRouter } from 'next/router'


interface CommonListProp {
  title?: string | undefined, // 当前列表的标题
  articleClassifyId?: string, // 当前列表的类型ID
  data: API.pagingResult<API.ArtileListItem>,
  paging?: boolean
};

// 渲染列表数据 从props 中获取
const CommonList = function (props: CommonListProp) {
  const { title = '', paging = false, data } = props;
  const pageSize = 10;
  // 页码
  const router = useRouter();

  const pageIndex = parseInt(router.query.page + '', 10) || 1
  // 每一个月份英文的缩写 取之刚好拿索引取就好了
  // const monthMap = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const monthMap = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  /** 前往文章详情 */
  const goArticleDetail = (id: number | undefined) => {
    router.push(`/blog/${id}`);
  };

  /**
   * 判断是否触底
   * 此函数进行判断是否触底
   * @param    handler  必填  判断后执行的回调函数
   * @returns  null
   */
  const isTouchBottom = (handler: () => void) => {
    // 文档显示区域高度
    const showHeight = window.innerHeight;
    // 网页卷曲高度
    const scrollTopHeight = document.body.scrollTop || document.documentElement.scrollTop;
    // 所有内容高度
    const allHeight = document.body.scrollHeight;
    // (所有内容高度 = 文档显示区域高度 + 网页卷曲高度) 时即为触底
    if (allHeight <= showHeight + scrollTopHeight) {
      handler();
    };
  };


  /**
   * 渲染时间
   */
  const renderTime = (date?: string) => {
    if (date) {
      const createTime = new Date(date);
      const day = createTime.getDate() > 10 ? createTime.getDate() : '0' + createTime.getDate();
      const month = monthMap[createTime.getMonth()]
      return (
        <div className='absolute z-10 left-0 top-0 rounded-tl-xl rounded-br-xl bg-green-300 w-10 h-14 flex flex-col justify-center items-center text-white '>
          <span className='text-sm font-bold'>{day}</span>
          <span className='text-xs'>{month}</span>
        </div>
      )
    }
    return null;
  };


  if (data.list.length === 0) {
    return (
      <div className=' mx-auto my-auto'>暂无数据</div>
    )
  }

  return (
    <div className='px-4 py-6 min-h-[calc(100vh-296px)]'>
      <h1 className='text-2xl relative main-title'>{title}</h1>
      {/* 目前只支持最新 排序吧 后面在添加 */}
      <ul className=' my-6 text-xs flex flex-row-reverse'>
        {/* <div>最新</div> */}
      </ul>
      {/* 渲染列表 做一个可以分页 */}
      <div className='flex flex-wrap'>
        {data.count === 0 ? <span> Loading...</span> : null}
        {
          data.list.map((item: API.ArtileListItem) => {
            const { coverImg = '', name = '', createTime = '', resume } = item
            return (
              <div key={item.id} className=' shadow-sm hover:cursor-pointer motion-reduce:transform-none rounded-xl overflow-hidden mb-8 box-border w-full md:w-1/2 md:px-4' onClick={() => goArticleDetail(item.id)}>
                {/* 图片 上部分 */}
                <div className='w-full'>
                  <div className="relative overflow-hidden rounded-xl">
                    {/* 给个时间 */}
                    {renderTime(createTime)}
                    <Image width={600} height={600} className='w-full  overflow-hidden transform hover:scale-110 motion-reduce:transform-none'
                      src={coverImg}
                      alt={name} />
                  </div>
                </div>
                {/* 下部分 */}
                <div className=' text-center px-10 py-6 bg-gray-100 '>
                  <div className='font-semibold  text-xl truncate box-border'>{name}</div>
                  <div className='text-sm pt-4 truncate box-border'>{resume}</div>
                </div>
              </div>
            )
          })
        }
      </div>

      {/* PC 端大屏幕 使用分页 这里使用padding-left padding-right 去做居中是非常不合理的方式 */}
      {paging && <div className='flex justify-between box-border w-28 mx-auto' >
        <button
          className=' cursor-pointer disabled:opacity-50'

          onClick={() => {

            router.push(`/blog/list/${pageIndex - 1}`)


          }}
          disabled={pageIndex === 1}
        >
          <i className='iconfont icon-icon_paging_left'></i>
        </button>

        <span>第{pageIndex}页</span>

        <button
          className='cursor-pointer disabled:opacity-50'
          onClick={() => {
            if ((data.count / pageSize) > pageIndex) {
              // 修改页面路径
              router.push(`/blog/list/${pageIndex + 1}`)
            }
          }}
          // Disable the Next Page button until we know a next page is available
          disabled={((data.count / pageSize) <= pageIndex)}
        >
          <i className='iconfont icon-icon_paging_right'></i>
        </button>
      </div>}
    </div>
  )
}


export default CommonList;

