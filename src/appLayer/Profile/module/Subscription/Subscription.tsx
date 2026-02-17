import React, {useEffect} from 'react'
import s from './Subscription.module.scss'
import {useTranslations} from 'next-intl'
import {useSubscriptionStore} from '@/store/useSubscriptionStore'

const Subscription = () => {
    const t = useTranslations('auth.profile.subscriptionHistory')
    const {
        subscriptions,
        fetchSubscriptions,
        loading,
        error,
        downloadReceipt,
        resumeSubscription,
        pauseSubscription
    } = useSubscriptionStore()
   
    useEffect(() => {
        fetchSubscriptions()
    }, [fetchSubscriptions])

    if (loading) return <p> Загрузка </p>
    if (error) return <p>{error}</p>
    // if (!subscriptions.length) return <p>{t('noSubscriptions')}</p>

    return (
        <section className={s.subscription}>
            {subscriptions.map((item) => {
                const formattedDate = new Date(item.created_at).toLocaleString('ru-RU', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                })

                return (
                    <div key={item.uuid} className={s.itemWrapper}>
                        <li>
                            <div>
                                <label>{t('date')}</label>
                                <p className={s.three}>{formattedDate}</p>
                            </div>
                            <div>
                                <label>{t('type')}</label>
                                <p className={s.three}>
                                    {item.donation_type}
                                </p>
                            </div>
                            <div>
                                <label>{t('receipt')}</label>
                                <button
                                    className={s.receipt}
                                    onClick={() => downloadReceipt(item.uuid)}
                                >
                                    {t('downloadReceipt')}
                                </button>
                            </div>
                        </li>
                        <li>
                            <div>
                                <label>{t('amount')}</label>
                                <p className={s.three}>
                                    {item.amount} {item.currency}
                                </p>
                            </div>
                            <div>
                                <label>{t('status')}</label>
                                <p className={s.status}>{item.status}</p>
                            </div>
                            {item.can_pause_subscription && (
                                <div>
                                    <label>{t('subscription')}</label>
                                    <button className={s.status}
                                            onClick={() => pauseSubscription(item.uuid)}>{t('stop')}
                                    </button>
                                </div>
                            )
                            }
                            {item.can_resume_subscription && (
                                <div>
                                    <label>{t('subscription')}</label>
                                    <button className={s.status}
                                            onClick={() => resumeSubscription(item.uuid)}>{t('resume')}
                                    </button>
                                </div>
                            )
                            }
                        </li>
                        {/*{item.subscription_status && (*/}
                        {/*    <div>*/}
                        {/*        <label>{t('subscriptionStatus')}</label>*/}
                        {/*        <p className={s.status}>{item.subscription_status}</p>*/}
                        {/*    </div>*/}
                        {/*)*/}
                        {/*}*/}
                    </div>
                )
            })}
        </section>
    )
}

export default Subscription
