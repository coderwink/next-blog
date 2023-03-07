import React, { ReactNode } from 'react'

interface IconButtonProps {
  icon: string,
  className?: string,
  onClick?: Function,
  children?: ReactNode
}


export default function index(props: IconButtonProps) {
  const { icon, className, onClick = null, children } = props;
  return (
    <button disabled={!onClick} className={`iconfont flex items-center text-2xl ${className} ${icon}`} onClick={() => onClick && onClick()}>{children}</button>
  )
}
