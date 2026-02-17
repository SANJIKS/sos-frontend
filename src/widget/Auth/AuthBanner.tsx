import React from 'react'
import s from './AuthBanner.module.scss'
import Image from 'next/image'

interface AuthBannerProps {
    className?: string
}

const AuthBanner: React.FC<AuthBannerProps> = ({ className }) => {
    return (
        <div className={`${s.authBanner} ${className || ''}`}>
            <Image src="/image/auth/authImg.jpg" alt="auth" fill objectFit="cover"
                   blurDataURL="/image/auth/authImg.jpg" className={s.authBannerImage}/>
            <div className={s.title}>
                Ни один ребенок
                не должен расти один
            </div>
        </div>
    )
}

export default AuthBanner