import React from 'react'
import NavBar from '../NavBar/Index'
import Image from 'next/image'
import LOGO from '@/assets/img/logo.png'
import { useRouter } from 'next/router'

export default function Index() {
  const router = useRouter()
  return (
    <div className='w-full flex justify-between items-center box-border md:w-2/5 h-30 md:m-auto md:pt-10'>
      <div className='flex items-center' onClick={() => router.push('/')}>
        <Image src={LOGO} width={60} height={60} className='rounded-full' alt={'logo'} />
        <span className='pl-6 font-bold text-2xl'>梦想小镇</span>
      </div>
      {/* 正常页面 */}
      <div className="hidden md:block"><NavBar /></div>
      {/* 小屏幕 这里回放置一个抽屉页面 */}
    </div>
  )
}
