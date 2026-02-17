import React from 'react'
import s  from './BannerPages.module.scss'
import Image from 'next/image'
const BannerPages = ({
    children,
    url = 'https://cdn-0.aki.kg/127/.storage/limon/images/2014my/576a1d12d623ddafb4b5493ae27c364b.jpg',
}: {
    children: React.ReactNode,
    url: string,
}) => {
  return (
    <div className={s.banner}>
        <Image src={url} alt='banner' fill className={s.image} objectFit='cover' aria-label='banner' priority blurDataURL={url} />
        <div className={s.content}>
            {children}
        </div>
    </div>
  )
}

export default BannerPages