import React, { ReactNode } from 'react'
import NavBar from '@/layout/NavBar/Index';

interface NavWithWidget {
  children: ReactNode,
  className?: string,
  [key: string]: any
}
export default function index(props: NavWithWidget) {
  const { children } = props;
  return (
    <div>
      {/* 这个做一个支持兼容PC版本 */}
      <div className='w-full flex'>
        <div className=" w-1/6 hidden md:block md:mr-4"><NavBar /></div>
        {
          children
        }
      </div>
    </div>
  )
}
