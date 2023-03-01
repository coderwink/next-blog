import React, { ReactNode } from 'react'
import CommonList from '@/component/CommonList/Index';
import NavBar from '@/layout/NavBar/Index';
import PureCard from '@/component/Widget/PureCard/Index'
export default function Index(props: { title: string | undefined, articleClassifyId?: string }) {
  const { title = '', articleClassifyId = '' } = props;
  return (
    <div>
      {/* 这个做一个支持兼容PC版本 */}
      <div className='w-full flex'>
        <div className=" w-1/6 hidden md:block md:mr-4"><NavBar /></div>
        <PureCard>
          {/* <CommonList title={title} articleClassifyId={articleClassifyId} /> */}
        </PureCard>

      </div>
    </div>
  )
}
