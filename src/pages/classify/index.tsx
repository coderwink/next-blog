import React, { useState } from 'react';
import LayoutHoc from '@/layout/index'
import PureCard from '@/component/Widget/PureCard/Index';
import { getCategoryList } from '@/services/api';
import { useRouter } from 'next/router'

interface ClassifyProps {
  title?: string;
  centerTitle?: string;
  result: API.CategoryItem[]
}

const Index = function (props: ClassifyProps) {
  const { title, result } = props
  const router = useRouter()
  // 接受一个索引 将被选中的图片放大后进行跳转路由
  const selectCategory = (item?: API.CategoryItem) => {
    console.log('点了咯', item);
    router.push(`/classify/${item?.id}`)
  };
  return (
    <div className='px-2 md:w-2/5 md:mx-auto'>
      {/* 分类列表 */}
      <PureCard className='px-4 py-6 mb-6'>
        <h1 className='text-2xl relative mb-12'>{title}</h1>
        {/* 文章分类容器 */}
        <div>
          <ul className='flex flex-wrap'>
            {
              result.map((item: API.CategoryItem) => {
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


    </div>
  )
}



export async function getServerSideProps(context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const data = await getCategoryList();
  if (!data) return { notFound: true }
  return {
    props: {
      title: '标签  🐲',
      result: data?.parsedBody?.data,
    }, // will be passed to the page component as props
  }
}

export default LayoutHoc(Index) 