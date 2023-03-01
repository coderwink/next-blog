import React, { useEffect, useState } from 'react';
import CommonList from '@/component/CommonList/Index';
import LayoutHoc from '@/layout/index'
import { getArticleList } from '@/services/api'
import PureCard from '@/component/Widget/PureCard/Index'

interface HomeProps {
  title: string;
  centerTitle: string;
  result: API.pagingResult<API.ArtileListItem>
}
// 封装一个hooks读取数据
const Home = function (props: HomeProps) {
  const { title = '', result } = props
  const [animate, setAnimate] = useState(false)
  useEffect(() => {
    const timer = setTimeout(() => { setAnimate(true) })
    return function () {
      clearTimeout(timer)
    }
  }, [])
  // 利用setTime  强制刷新
  return (
    <div className="w-full flex flex-col box-border px-2 md:w-2/5 md:m-auto">
      <PureCard><CommonList title={title} data={result} paging /></PureCard>
    </div>
  )
}


export default LayoutHoc(Home);

export async function getServerSideProps(context: any) {
  // console.log(context.params); 
  // 这里可以写死首页
  const data = await getArticleList({ pageIndex: 1, pageSize: 10 })
  return {
    props: {
      title: '文章列表',
      result: data?.parsedBody?.data,
    },
  }
}