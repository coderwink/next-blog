import React, { useState } from 'react';

import LayoutHoc from '@/layout/index'

import PureCard from '@/component/Widget/PureCard/Index';
import CommonList from '@/component/CommonList/Index';
import { useAppSelector, useAppDispatch } from '../../store/hooks'

import { getArticleList } from '@/services/api';
import Head from 'next/head'

interface ClassifyProps {
  title?: string;
  centerTitle?: string;
  result: API.pagingResult<API.ArtileListItem>
}


const Index = function (props: ClassifyProps) {
  const { title, result } = props
  const classify = useAppSelector((state) => state.classify.name)
  return (
    <>
      <Head>
        <title>{classify}</title>
      </Head>
      <div className='px-2 md:w-2/5 md:mx-auto'>
        {/* 分类列表 */}
        <PureCard className='px-4 py-6 mb-6'>
          {/* 文章分类容器 */}
          <PureCard><CommonList title={classify} data={result} /></PureCard>
        </PureCard>
      </div>
    </>
  )
}



export async function getServerSideProps(context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { query: { id: articleClassifyId } } = context

  const data = await getArticleList({ pageIndex: 1, pageSize: 100, articleClassifyId });

  if (!data) return { notFound: true }
  return {
    props: {
      title: '分类详情',
      result: data?.parsedBody?.data,
    }, // will be passed to the page component as props
  }
}

export default LayoutHoc(Index) 