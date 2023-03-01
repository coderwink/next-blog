import React from 'react';
import PureCard from '@/component/Widget/PureCard/Index';
import LayoutHoc from '@/layout/index'
import CommonList from '@/component/CommonList/Index';
import { getArticleList } from '@/services/api'
import Head from 'next/head'
interface PageProps {
  title: string;
  centerTitle: string;
  result: API.pagingResult<API.ArtileListItem>
}
const Page = (props: PageProps) => {
  const { title = '', centerTitle, result } = props

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className='w-full flex flex-col box-border px-2 md:w-2/5 md:m-auto'>
        <PureCard><CommonList title={title} data={result} paging={true} /></PureCard>
      </div>
    </>
  )
}

export default LayoutHoc(Page)


export async function getServerSideProps(context: any) {
  const { query: { page = 1 } } = context
  // 通过页面上的参数进行对数据的读取
  const data = await getArticleList({ pageIndex: page, pageSize: 10 })

  return {
    props: {
      title: '全部文章',
      centerTitle: '知足者常乐，世事都如烟',
      result: data?.parsedBody?.data,
    },
  }
}