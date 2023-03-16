import React from 'react';
import LayoutHoc from '@/layout/index'
import { getArticleDetail } from '@/services/api'
import PureCard from '@/component/Widget/PureCard/Index'
import Markdown from '@/component/RenderMarkDown'
import MarkdownNavbar from 'markdown-navbar';
import { useAppSelector } from '@/store/hooks'

import Head from 'next/head'
interface IndexProps {
  title: string;
  centerTitle: string;
  result: API.ArtileListItem
}
// 封装一个hooks读取数据
const Index = function (props: IndexProps) {
  const { title = '', result: { content = '', name = '', createTime, views = 100 } } = props
  const theme = useAppSelector(state => state.config.theme);
  const haveNavBar = content.includes('# ')
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      {/* 判断目录是否存在 */}
      <div className='px-2 box-border article-content relative flex md:w-2/5 md:mx-auto'>
        {
          haveNavBar ? <PureCard className='py-6 box-border absolute top-0 left-0 -translate-x-72 hidden md:block'>目录
            <MarkdownNavbar source={content} className='dark:text-white dark:text-opacity-80' />
          </PureCard> : null
        }

        <PureCard className='px-4 py-6 box-border min-h-screen  w-full'>
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
                <div className='flex text-xs items-center mr-2 mt-4'>
                  <i className={`icon-yanjing iconfont`}></i>&nbsp; {views ? views : 100}
                </div>

              </div>
            </header>
            <section className='mt-6'> <Markdown content={content} /> </section>
          </article>
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