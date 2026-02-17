import React from 'react'
import s from './LoadingPage.module.scss'
import MainIco from '@/assets/icons/mobileHeader.svg'
const LoadingPage = () => {
    return (
        <div className={s.Block2} >
            <span className={s.loader} >
                  <MainIco className={s.icon} />
                <span className={s.loadersd} ></span>
            </span>
        </div>
    )
}

export default LoadingPage