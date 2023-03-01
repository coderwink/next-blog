import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import IconButton from '@/component/Widget/IconButton'
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
  const [flag, setFlag] = useState(false)

  const dealWith = () => setFlag((flag) => !flag)

  useEffect(() => {
    if (flag) { document.body.style.overflow = 'hidden' }
    else { document.body.style.overflow = 'auto' }
  }, [flag])

  return (
    <div>
      {/* 打开按钮 */}
      <IconButton icon='icon-fenlei' className='iconfont block text-3xl md:text-4xl' onClick={() => dealWith()} />

      <div className={`fixed top-0 left-0 w-full h-screen overflow-hidden bg-gray-400 opacity-80 transition-transform transform z-50 ${flag ? 'translate-x-0' : 'translate-x-full'}`}>

        {/* 关闭按钮 */}
        <IconButton icon='icon-close' className='absolute top-10 right-6' onClick={() => dealWith()} />
        {/* 标签列表 */}
        <ul id='good' className=' w-full flex flex-col items-center align-middle absolute  top-20 left-1/2 -translate-x-1/2 '>
          {
            memu.map((item: menuItem, index: number) => {
              return (
                <li data-info={item.id} key={item.id} className='text-center flex border-b-2 flex-col justify-center cursor-pointer box-border p-1 mt-6'>
                  <Link href={item.path}> <span data-info={item.id} className='text-2xl'>{item.name}</span></Link>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}
