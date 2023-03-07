import React, { useEffect, useState } from 'react'
import NavBar from '../NavBar/Index'
import NavBarH5 from '../NavBarH5'
import Image from 'next/image'
import LOGO from '@/assets/img/logo.png'
import IconButton from '@/component/Widget/IconButton'
import { useRouter } from 'next/router'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { getTheme, setTheme } from '@/store/reducers/configSlice'
import { changeModel, getModel } from '@/utils/theme'

export default function Index() {
  const router = useRouter();
  // 这个直接从localStorage中拿
  // const [model, setModel] = useState('dark');

  const model = useAppSelector(getTheme)
  const dispatch = useAppDispatch()

  const showMark = function () {

    let status: modelType = 'light';
    if (model === 'light') { status = 'dark' }
    localStorage.theme = status;
    dispatch(setTheme(status));
    changeModel();

  }

  return (
    <div className='w-full flex justify-between items-center box-border md:w-2/5 h-30 md:m-auto pt-10 px-6'>
      <div className='flex items-center cursor-pointer' onClick={() => router.push('/')}>
        <Image src={LOGO} width={60} height={60} className='rounded-full hidden md:block' alt={'logo'} />
        <span className='font-bold text-2xl ml-6'>梦想小镇</span>
      </div>
      {/* 正常页面 */}
      <div className=" hidden md:block"><NavBar /></div>
      {/* 小屏幕 这里回放置一个抽屉页面 */}
      <div className="md:hidden">
        <NavBarH5 />
      </div>
      {/* 白天模式/暗黑模式 */}
      <div className="hidden md:block">
        <IconButton icon={model === 'dark' ? 'icon-dark' : 'icon-baitianmoshimingliangmoshi'} onClick={() => showMark()} />

        {/* <div className={` absolute opacity-0  transition-opacity  ${flag ? 'opacity-100' : ''}`}>
          <IconButton icon='icon-baitianmoshimingliangmoshi' onClick={() => setStatus('light')}><span className='text-xs pl-2'>白天模式</span></IconButton>
          <IconButton icon='icon-dark' onClick={() => setStatus('dark')} ><span className='text-xs pl-2'>暗黑模式</span></IconButton>
        </div> */}

      </div>
    </div>
  )
}
