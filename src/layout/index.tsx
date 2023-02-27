import React from 'react'
import Head from './Head/Index'
import FootNav from './FootNav/Index'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

// 创建一个 client
const queryClient = new QueryClient()


export default function Index(Wapper: any) {
  return function Be(props: any) {
    return (
      <QueryClientProvider client={queryClient}>
        {<Head />}
        <Wapper  {...props} />
        {<FootNav />}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    )
  }
}