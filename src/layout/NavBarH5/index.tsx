import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link'
type menuItem = {
  id: string;
  name: string;
  icon: string;
  path: string;
}
type menuNav<T> = T[];
export default function NavBarH5() {
  const memu: menuNav<menuItem> = [{
    id: '1',
    name: '文章',
    icon: 'icon-shu',
    path: '/blog',
  }, {
    id: '2',
    name: '标签',
    icon: 'icon-fenlei',
    path: '/classify',

  }, {
    id: '3',
    name: '关于我',
    icon: 'icon-caidanguanyuwo',
    path: '/about',

  }, {
    id: '4',
    name: '友链',
    icon: 'icon-lianjie',
    path: '/weblink',

  }]

  return (
    <ul id='good' className='fixed top-0 left-0 bg-white w-full flex items-center align-middle z-50 md:static md:rounded-xl'>
      {
        memu.map((item: menuItem, index: number) => {
          return (
            <li data-info={item.id} key={item.id}
              // className={`${currentIndex == index ? 'border-indigo-600 text-indigo-600' : 'text-zinc-700'}  
              //     text-center flex border-b-2 flex-col justify-center cursor-pointer box-border p-1
              //     md:hover:text-indigo-600 md:border-none md:py-4`}
              className='text-center flex border-b-2 flex-col justify-center cursor-pointer box-border p-1 md:border-none md:py-4'
            >
              <Link href={item.path}>
                {/* <i data-info={item.id} className={`${item.icon} iconfont block text-sm md:text-4xl`}></i> */}
                <span data-info={item.id} className='text-sm mt-1.5'>{item.name}</span>
              </Link>

            </li>
          )
        })
      }
    </ul>
  )
}
