import React from 'react'
import { useTranslations } from 'next-intl'
import s  from   './DonationImpact.module.scss'
import Image from 'next/image'
interface ImpactCard {
    sum: number;
    title: string;
}

const DonationImpact = () => {
    const t = useTranslations('donationImpact')
    
    const cards = t.raw('cards') as ImpactCard[]
  return (
    <div className={s.donationImpact}>
       <h2>{t('title')}</h2>

            <div className={s.cards}>
                {
                    cards.map((card,index)=>(
                        <div className={s.card} key={index}>
                            <Image src={`/image/donate/donation-impact-item-${index}.jpg`} alt='donation-impact' fill objectFit='cover' />
                            <div>
                                <h3>{card.sum}</h3>
                                <p>{card.title}</p>
                            </div>
                        </div>
                    ))
                }

        </div>

    </div>
  )
}

export default DonationImpact