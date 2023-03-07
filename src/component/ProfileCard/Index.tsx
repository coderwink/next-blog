import React from 'react'
import Qiqi from '@/assets/img/qiqi.webp';
import Image from 'next/image';
export default function Index() {
  // 目前不开启页面缓存
  const baseInfo: BaseInfoItem[] = [{
    title: '邮箱',
    content: 'coderwink@qq.com'
  }, {
    title: '企鹅',
    content: '1575659570'
  },
  {
    title: '所在城市',
    content: 'HangZhou'
  }]

  return (
    <div className=' box-border px-10 bg-white rounded-3xl  relative  flex flex-col divide-y divide-slate-200 lg:flex-row lg:divide-x lg:divide-y-0 lg:py-10
     dark:bg-gray-900 dark:text-white  dark:divide-gray-700 dark:text-opacity-80'>
      {/* 头像部分 */}
      <div className='flex flex-col items-center lg:flex-1 lg:px-2 lg:flex-row lg:mt-0'>
        <div className='w-32 h-32 rounded-full overflow-hidden shadow-xl border-4 border-white '>
          <Image src={Qiqi} className='w-full h-full' alt="头像" />
        </div>
        <div className=' text-center mt-8 mb-4 lg:ml-6'>
          <h4 className=' text-xl font-bold'>万正兴</h4>
          <div>前端开发者</div>
        </div>
      </div>
      {/* 基本信息 */}
      <div className='pt-7 lg:flex-1 lg:px-4'>
        <ul>
          {
            baseInfo.map((item, index) => {
              return (
                <li key={index} className='mb-3' >
                  <div className='text-xs'>{item.title}</div>
                  <div className=' text-xs'>{item.content}</div>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
