import React from 'react'
import s from './DetailedProgamPage.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import About from './module/About/About'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import {IProgram} from '@/shared/types/program'

interface DetailedProgamPageProps {
    program: IProgram
}

const DetailedProgamPage: React.FC<DetailedProgamPageProps> = ({ program }) => {
    return (
        <div className={s.programmePage}>
            <BannerPages url="/image/fond/fondMain.jpg">
                <div className={s.title}>
                    <h1>{program.title}</h1>
                    <p className={s.description}>
                        {program.short_description}
                    </p>
                </div>
            </BannerPages>
            <div className={s.content}>
                <About program={program} />
                <DonationForm/>
            </div>
        </div>
    )
}

export default DetailedProgamPage
