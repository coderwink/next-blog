import React from 'react'
import Head from './Head/Index'
import FootNav from './FootNav/Index'




export default function Index(Wapper: any) {
  return function Be(props: any) {
    return (
      <div>
        {<Head />}
        <Wapper  {...props} />
        {<FootNav />}
      </div>
    )
  }
}