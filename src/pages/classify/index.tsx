import React, { useState } from 'react';
// import { NavigateFunction, useNavigate, useSearchParams } from 'react-router-dom';
import LayoutHoc from '@/layout/index'

import PureCard from '@/component/Widget/PureCard/Index';
import { useQuery } from "react-query";
import UseMutationObserver from '@/hooks/UseMutationObserver';
import { getCategoryList } from '@/services/api';
import NavWithList from '@/component/Widget/NavWithList/Index';
const Index = function () {

  const { isLoading, isError, data, error } = useQuery<any>('category', () => getCategoryList());
  // 选中当前的行的数据
  const [selectRow, setRow] = useState<API.CategoryItem>();
  // 只要是菜单就一定存在
  // const navigate: NavigateFunction = useNavigate();
  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    //@ts-ignore
    return <span>Error: {error.message}</span>;
  }
  // 接受一个索引 将被选中的图片放大后进行跳转路由
  const selectCategory = (item?: API.CategoryItem) => {
    // 首次需要调用这个方法 如何区分首次呢
    const el = document.querySelector('#commonList') as HTMLElement
    if (!selectRow) {
      // 这里是否会存在闭包
      UseMutationObserver((el: HTMLElement) => {
        document.documentElement.scrollTop = el?.offsetTop as number - 80;
      }, el);
    } else {
      document.documentElement.scrollTop = el?.offsetTop as number - 80;
    }
    setRow(item);
  };
  return (
    <div className='-mt-10 px-2 md:w-3/5 md:mx-auto'>
      {/* 分类列表 */}
      <PureCard className='px-4 py-6 mb-6'>
        <h1 className='text-2xl relative mb-12'>文章分类</h1>
        {/* 文章分类容器 */}
        <div>
          <ul className='flex flex-wrap'>
            {
              data.map((item: API.CategoryItem) => {
                return (
                  <li onClick={() => selectCategory(item)} key={item.id} className='w-full bg-gray-100  text-center flex items-center flex-col cursor-pointer mb-4 p-4 pt-10 rounded-lg hover:bg-sky-50'>
                    <div className='relative inset-0 w-full'>
                      <div className='absolute left-1/2 transform -translate-x-1/2 '>
                        <img src={item.coverImg} className='w-20 transition-all transform hover:scale-110 hover:transition-all' alt="分类图片" />
                      </div>
                      <div className='pt-32'>{item.name}</div>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </PureCard>

      {/* 分类详情 */}
      <div id='commonList'>
        {
          selectRow ? (<div >
            <NavWithList title={selectRow?.name} articleClassifyId={selectRow?.id} />
            <i className='text-4xl iconfont icon-huidaodingbu fixed bottom-10 right-2' onClick={() => document.body.scrollIntoView()}></i>
          </div>) : null
        }
      </div>
    </div>
  )
}


export default LayoutHoc(Index) 