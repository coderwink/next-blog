import React from 'react';
import ProfileCard from '@/component/ProfileCard/Index';
import PureCard from '@/component/Widget/PureCard/Index';
import LayoutHoc from '@/layout/index'
import Head from 'next/head'

const About: React.FC = (props) => {
  const todoList = [
    {
      id: 1,
      name: '工作',
      icon: 'icon-work',
      desc: '找寻一份合适的工作'
    },
    {
      id: 2,
      name: '桌面端',
      icon: 'icon-zhuomian',
      desc: '开发一款加载游戏MOD的插件'
    },
    {
      id: 3,
      name: "健康",
      icon: 'icon-juminjiankangqia-',
      desc: '锻炼身体，矫正一些不良习惯'
    }, {
      id: 4,
      name: "web开发",
      icon: 'icon-web',
      desc: 'web开发知识精进'
    }
  ]
  return (

    <>
      <Head>
        <title>关于我 - 梦想小镇</title>
      </Head>
      <div className='px-2 md:w-2/5 md:m-auto  '>
        {/* 个人信息 */}
        <ProfileCard />
        {/* 兴趣爱好 */}
        <PureCard className='px-4 py-6 w-full dark:text-opacity-80'>
          <article>
            <section>
              <h1 className='text-3xl relative main-title'>关于</h1>
              <p className=' text-sm mt-10'>
                不知不觉已经从事前端行业快3年啦～  依然还得继续学习！
              </p>
              <p className='text-sm mt-4'>
                兴趣： 运动 音乐 动漫 游戏
              </p>
              <p className='text-sm mt-4'></p>
            </section>
            <section>
              <h1 className='text-2xl'>最近在做的事情</h1>
              {/* list 表格 */}

              <div className='now-todo-list w-full md:flex md:flex-wrap'>
                {
                  todoList.map(({ id, name, desc, icon }) => {
                    return (
                      <div className='md:w-1/2 md:px-2' key={id}>
                        <div className='border-gray-300 border-2 rounded-xl h-52 flex flex-col justify-center items-center my-10' key={id}>
                          <i className={`${icon} iconfont text-4xl `} ></i>
                          <div className='font-bold text-xl'> {name}</div>
                          <div className='mt-5'>{desc}</div>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </section>
          </article>
        </PureCard>
      </div>
    </>

  )
}

export default LayoutHoc(About)
