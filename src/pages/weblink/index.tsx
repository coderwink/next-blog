import React from 'react';
import PureCard from '@/component/Widget/PureCard/Index';
import LayoutHoc from '@/layout/index'
import styles from './index.module.css'
import Head from 'next/head'

const About: React.FC = () => {
  const link = [
    {
      category: '博客区',
      value: [{
        name: '阮一峰的网络日志',
        url: 'https://www.ruanyifeng.com/blog/'
      },
      {
        name: '羡辙',
        url: 'http://zhangwenli.com/'
      },
      {
        name: '醉牛前端',
        url: 'http://f2er.club'
      }, {
        name: '小马部落阁',
        url: 'http://maqib.cn/'
      }
      ]
    }
  ]
  return (
    <>
      <Head>
        <title>友链 - 梦想小镇</title>
      </Head>
      <div className='px-2 h-[calc(100vh-196px)] md:w-2/5 md:m-auto'>
        {/* 个人信息 */}
        {/* <ProfileCard /> */}
        {/* 对自己影响比较深刻的博主 */}
        <PureCard className='px-4 py-6 w-full'>
          <article>
            <section>
              <h1 className='text-3xl relative main-title'>友链</h1>
              {
                link.map((item, index) => {
                  return (
                    <div key={index} className='mt-8'>
                      <div className='text-xl font-bold'>{item.category}</div>
                      <ul className='mt-2 pl-6 list-disc'>
                        {
                          item.value.map((itez, indey) => {
                            return (
                              <li key={indey} className='mb-2 w-fit hover:text-indigo-600'>
                                <a className={styles.link} href={itez.url} target='_blank'>{itez.name}</a>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                  )
                })
              }
            </section>
          </article>
        </PureCard>

      </div>
    </>


  )
}

export default LayoutHoc(About)