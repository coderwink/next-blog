import React from 'react'
import Head from './Head/Index'
import FootNav from './FootNav/Index'
export default function Index(Wapper: any) {
  return function Be(props: any) {
    return (
      <div className='dark:bg-gray-900 dark:text-white  dark:text-opacity-80'>
        {<Head />}
        <Wapper  {...props} />
        {<FootNav />}
      </div>
    )
  }
}