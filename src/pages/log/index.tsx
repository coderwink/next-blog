import React, { useEffect, useState } from 'react';
import LayoutHoc from '@/layout/index'
import PureCard from '@/component/Widget/PureCard/Index'
import Head from 'next/head'
interface LogProps {
  title: string;
  centerTitle: string;
  result: API.Log[]
}


// 封装一个hooks读取数据
const LogPage = function (props: LogProps) {
  const { title = '', result } = props
  // 利用setTime  强制刷新
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='px-2 h-[calc(100vh-196px)] pt-8 md:w-2/5 md:m-auto'>

        <h1 className='text-3xl relative main-title'>更新日志</h1>
        {/* 渲染列表 */}
        <ul className='mt-10 divide-y-2 divide-opacity-60'>

          {
            result.map((item, index) => {
              return <li className='my-4' key={index}>
                <div className='text-xl font-bold my-2'>{item.date}</div>
                <div className=' text-base'>{item.resume}</div>
              </li>
            })
          }

        </ul>
      </div>
    </>
  )
}


export default LayoutHoc(LogPage);

export async function getServerSideProps(context: any) {
  // 这里可以写死首页
  // const data = await getArticleList({ pageIndex: 1, pageSize: 10 })
  const data: API.Log[] = [
    { resume: '🔥 1.添加暗黑模式 2. 增加日志记录', date: '2022年3月6日' },
    { resume: '使用nextjs重构网站增加SSR支持、静态页面渲染功能、 减轻服务器压力。', date: '2022年3月1日' },
  ]
  return {
    props: {
      title: '更新日志',
      // result: data?.parsedBody?.data,
      result: data
    },
  }
}