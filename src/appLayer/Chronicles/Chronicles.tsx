import React from 'react'
import s from './Chronicles.module.scss'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import Blocks from '@/appLayer/Chronicles/modules/Blocks/Blocks'

const Chronicles = () => {
    return (
        <div className={s.chronicles}>
            <BannerPages url="/image/fond/fondMain.jpg">
                <div className={s.title}>
                    <h1>Хроники Компании: Наш Цифровой Путь Влияния</h1>
                    <p>
                        Добро пожаловать в наш Центр цифровых кампаний — платформу для прозрачного анализа прошлых и
                        текущих инициатив. Здесь вы найдёте доказательства реального воздействия и сможете задаться
                        вопросом, какие факторы сделали одни проекты успешными, а другие — нет. Ознакомьтесь с нашими
                        актуальными кампаниями, нацеленными на формирование устойчивого будущего в цифровую эпоху.
                        Оставайтесь критично информированы, вдохновляйтесь конкретными результатами и присоединяйтесь к
                        нашей миссии по созданию лучшего завтра.
                    </p>
                </div>
            </BannerPages>
            <div className={s.content}>
                <Blocks/>
                <DonationForm/>
            </div>
        </div>
    )
}

export default Chronicles