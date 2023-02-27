import React, { useEffect, useState } from 'react';
import ProfileCard from '@/component/ProfileCard/Index';
import CommonList from '@/component/CommonList/Index';
import NavBar from '@/layout/NavBar/Index';
import NavWithList from '@/component/Widget/NavWithList/Index';
import LayoutHoc from '@/layout/index'
import { getArticleList } from '@/services/api'
import { nextPage, prePage, getCurrentAsync } from '@/store/reducers/ArticleSlice'
import PureCard from '@/component/Widget/PureCard/Index'
import { useAppSelector, useAppDispatch } from '@/store/hooks'
interface HomeProps {
  title: string;
  centerTitle: string;
  result: API.pagingResult<API.ArtileListItem>
}
// 封装一个hooks读取数据
const Home = function (props: HomeProps) {
  const { title = '', centerTitle, result } = props
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
      {/* <ProfileCard /> */}
      {/* 知足常乐 */}
      <PureCard className='w-full h-[calc(100vh-96px)] flex justify-center items-center'>
        {/* 等这个dom全部加在完毕在去添加 */}
        <div className={`px-4 text-3xl md:text-4xl ${animate ? ' transition-in' : ''} `}>
          {
            [...centerTitle].map((item, index) => <span key={index} style={{ transitionDelay: `${0.2 * index}s` }} className='transition-opacity opacity-0'>{item}</span>)
          }
        </div>
      </PureCard>

      <PureCard> <CommonList title={title} data={result} /></PureCard>
      {/* <NavWithList title='最新文章' /> */}
    </div>
  )
}


export default LayoutHoc(Home);

export async function getServerSideProps(context: any) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // console.log(context.params); 
  // 这里可以写死首页
  const data = await getArticleList({ pageIndex: 1, pageSize: 6 })
  return {
    props: {
      title: '最新文章',
      centerTitle: '知足者常乐，世事都如烟',
      result: data?.parsedBody?.data,
    }, // will be passed to the page component as props
  }
}