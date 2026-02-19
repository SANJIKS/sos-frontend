'use client'

import Footer from '@/widget/Footer/Footer/Footer'
import Header from '@/widget/Header/Header/Header'
import React, {FC, ReactNode} from 'react'
import {Toaster} from 'react-hot-toast'
import Accessibilik from 'accessibility-react-widget'

interface IProps {
    children: ReactNode
}

const MainApp: FC<IProps> = (props) => {
    const {children} = props

    return (
        <>
            <Accessibilik/>
            <Header/>
            {children}
            <Toaster/>
            <Footer/>
        </>
    )
}

export default MainApp
