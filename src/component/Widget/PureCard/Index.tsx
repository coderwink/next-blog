import React, { ReactNode } from 'react'
interface CardProps {
  children: ReactNode;
  className?: string;
  [key: string]: any;
}
export default function Index(props: CardProps) {
  return (
    <div className={`${props.className ? props.className : ''} bg-white rounded-3xl dark:bg-gray-900 dark:text-white dark:text-opacity-80 dark:divide-gray-700`}>
      {props.children}
    </div>
  )
}
