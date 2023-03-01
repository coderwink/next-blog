import React, { ReactNode } from 'react'

interface IconButtonProps {
  icon: string,
  className?: string,
  onClick?: Function
}


export default function index(props: IconButtonProps) {
  const { icon, className, onClick = null } = props;
  return (
    <button disabled={!onClick} className={`iconfont block text-2xl ${className} ${icon}`} onClick={() => onClick && onClick()} ></button>
  )
}
