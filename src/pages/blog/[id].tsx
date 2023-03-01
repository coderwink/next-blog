import React, { useEffect, useState } from 'react';
import CommonList from '@/component/CommonList/Index';
import LayoutHoc from '@/layout/index'
import { getArticleDetail } from '@/services/api'
import PureCard from '@/component/Widget/PureCard/Index'
import { Editor, Viewer } from '@bytemd/react'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import MarkdownNavbar from 'markdown-navbar';

import 'bytemd/dist/index.css'
import 'github-markdown-css'
import 'highlight.js/styles/github.css'
import 'markdown-navbar/dist/navbar.css';
import Head from 'next/head'
interface IndexProps {
  title: string;
  centerTitle: string;
  result: API.ArtileListItem
}

const plugins: any = [
  gfm(),
  highlight()
]
// 封装一个hooks读取数据
const Index = function (props: IndexProps) {
  const { title = '', result: { content = '', name = '', createTime } } = props
  const sanitize = (schema: any) => {
    return schema
  }
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div className='px-2 box-border article-content relative flex md:w-2/5 md:mx-auto'>
        <PureCard className='px-4 py-6 box-border min-h-screen markdown-body w-full'>
          <article className=''>
            <header>
              <div className='text-xl'>{name}</div>
              <div className='flex flex-col md:flex-row'>

                <div className='flex text-xs items-center mr-2 mt-4'>
                  <i className={`icon-icon iconfont `}></i>&nbsp;{createTime ? createTime : '--'}
                </div>

                <div className='flex text-xs items-center mr-2 mt-4'>
                  <i className={`icon-web__guanyuwomen iconfont`}></i>&nbsp;coderwink
                </div>
                {/* <div className='flex text-xs items-center'>
                <i className={`icon-yanjing iconfont`}></i>&nbsp;{'--'}
              </div> */}

              </div>
            </header>
            <section className='mt-6'>
              <Viewer value={content} plugins={plugins} sanitize={sanitize} />
            </section>
          </article>
        </PureCard>
        <PureCard className='px-4 py-6 box-border absolute top-0 right-0 translate-x-40  hidden md:block'>
          目录
          <MarkdownNavbar source={content} />
        </PureCard>
      </div>
    </>
  )
}


export default LayoutHoc(Index);

export async function getServerSideProps(context: any) {
  // console.log(context.params); 
  // 这里可以写死首页
  const { query: { id } } = context
  const data = await getArticleDetail({ id })

  if (!data) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      title: '文章详情',
      result: data?.parsedBody?.data,
    },
  }
}