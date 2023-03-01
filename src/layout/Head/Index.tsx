import React, { useState } from 'react'
import NavBar from '../NavBar/Index'
import NavBarH5 from '../NavBarH5'
import Image from 'next/image'
import LOGO from '@/assets/img/logo.png'
import { useRouter } from 'next/router'
export default function Index() {
  const router = useRouter();

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
        <NavBarH5  ></NavBarH5>
      </div>

    </div>
  )
}
