'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import s from './ProficyPolicy.module.scss'


const PrivacyPolicy = () => {
    const t = useTranslations('privacyPolicy')
    
    return (
        <div className={s.container}>
            <h1 className={s.title}>
                {t('title')}
            </h1>
            <p className={s.subtitle}>
                {t('subtitle')}
            </p>

            <section>
                <h2>{t('chapter1.title')}</h2>
                <p>{t('chapter1.p1')}</p>

                <p>{t('chapter1.p2')}</p>

                <p>{t('chapter1.p3')}</p>
                <ul>
                    <li>{t('chapter1.terms.donors')}</li>
                    <li>{t('chapter1.terms.beneficiaries')}</li>
                    <li>{t('chapter1.terms.operator')}</li>
                    <li>{t('chapter1.terms.site')} <a href="https://soskyrgyzstan.kg" target="_blank">https://soskyrgyzstan.kg</a></li>
                    <li>{t('chapter1.terms.personalData')}</li>
                    <li>{t('chapter1.terms.users')}</li>
                    <li>{t('chapter1.terms.subject')}</li>
                    <li>{t('chapter1.terms.specialCategories')}</li>
                    <li>{t('chapter1.terms.blocking')}</li>
                    <li>{t('chapter1.terms.crossBorder')}</li>
                </ul>

                <p>{t('chapter1.p4')}</p>
                <p>{t('chapter1.p5')}</p>
                <p>{t('chapter1.p6')}</p>
            </section>

            <section>
                <h2>{t('chapter2.title')}</h2>
                <p>{t('chapter2.p1')}</p>
                <ul>
                    <li>{t('chapter2.principles.rights')}</li>
                    <li>{t('chapter2.principles.legality')}</li>
                    <li>{t('chapter2.principles.confidentiality')}</li>
                    <li>{t('chapter2.principles.minimization')}</li>
                    <li>{t('chapter2.principles.nonMerging')}</li>
                    <li>{t('chapter2.principles.security')}</li>
                </ul>

                <p>{t('chapter2.p2')}</p>
                <ul>
                    <li>{t('chapter2.purposes.contracts')}</li>
                    <li>{t('chapter2.purposes.donations')}</li>
                    <li>{t('chapter2.purposes.accounting')}</li>
                    <li>{t('chapter2.purposes.obligations')}</li>
                    <li>{t('chapter2.purposes.information')}</li>
                    <li>{t('chapter2.purposes.events')}</li>
                    <li>{t('chapter2.purposes.statistics')}</li>
                    <li>{t('chapter2.purposes.legislation')}</li>
                    <li>{t('chapter2.purposes.improvement')}</li>
                    <li>{t('chapter2.purposes.other')}</li>
                </ul>

                <p>{t('chapter2.p3')}</p>
            </section>

            <section>
                <h2>{t('chapter3.title')}</h2>
                <p>{t('chapter3.p1')}</p>
                <ul>
                    <li>{t('chapter3.donorData.name')}</li>
                    <li>{t('chapter3.donorData.phone')}</li>
                    <li>{t('chapter3.donorData.email')}</li>
                    <li>{t('chapter3.donorData.address')}</li>
                    <li>{t('chapter3.donorData.payment')}</li>
                </ul>

                <p>{t('chapter3.p2')}</p>
                <ul>
                    <li>{t('chapter3.userData.contacts')}</li>
                    <li>{t('chapter3.userData.social')}</li>
                    <li>{t('chapter3.userData.actions')}</li>
                    <li>{t('chapter3.userData.technical')}</li>
                    <li>{t('chapter3.userData.sessions')}</li>
                    <li>{t('chapter3.userData.logs')}</li>
                    <li>{t('chapter3.userData.public')}</li>
                </ul>

                <p>{t('chapter3.p3')}</p>
                <ul>
                    <li>{t('chapter3.offlineData.name')}</li>
                    <li>{t('chapter3.offlineData.contacts')}</li>
                    <li>{t('chapter3.offlineData.donations')}</li>
                </ul>

                <p>{t('chapter3.p4')}</p>
            </section>

            <section>
                <h2>{t('chapter4.title')}</h2>
                <ul>
                    <li>{t('chapter4.p1')}</li>
                    <li>{t('chapter4.p2')}
                        <ul>
                            <li>{t('chapter4.thirdParty.payments')}</li>
                            <li>{t('chapter4.thirdParty.storage')}</li>
                            <li>{t('chapter4.thirdParty.authorities')}</li>
                        </ul>
                    </li>
                    <li>{t('chapter4.p3')}</li>
                    <li>{t('chapter4.p4')}</li>
                    <li>{t('chapter4.p5')}</li>
                </ul>
            </section>

            <section>
                <h2>{t('chapter5.title')}</h2>
                <ul>
                    <li>{t('chapter5.p1')}
                        <ul>
                            <li>{t('chapter5.subjectRights.know')}</li>
                            <li>{t('chapter5.subjectRights.modify')}</li>
                            <li>{t('chapter5.subjectRights.withdraw')}</li>
                            <li>{t('chapter5.subjectRights.info')}</li>
                            <li>{t('chapter5.subjectRights.copy')}</li>
                            <li>{t('chapter5.subjectRights.block')}</li>
                        </ul>
                    </li>
                    <li>{t('chapter5.p2')}
                        <ul>
                            <li>{t('chapter5.operatorDuties.compliance')}</li>
                            <li>{t('chapter5.operatorDuties.protection')}</li>
                            <li>{t('chapter5.operatorDuties.access')}</li>
                            <li>{t('chapter5.operatorDuties.destruction')}</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section>
                <h2>{t('chapter6.title')}</h2>
                <ul>
                    <li>{t('chapter6.p1')}
                        <ul>
                            <li>{t('chapter6.measures.responsible')}</li>
                            <li>{t('chapter6.measures.access')}</li>
                            <li>{t('chapter6.measures.security')}</li>
                            <li>{t('chapter6.measures.backup')}</li>
                            <li>{t('chapter6.measures.control')}</li>
                        </ul>
                    </li>
                </ul>
            </section>

            <section>
                <h2>{t('chapter7.title')}</h2>
                <ul>
                    <li>{t('chapter7.p1')}</li>
                    <li>{t('chapter7.p2')} <a href="https://soskyrgyzstan.kg"
                                                               target="_blank">https://soskyrgyzstan.kg</a></li>
                    <li>{t('chapter7.p3')}</li>
                    <li>{t('chapter7.p4')}</li>
                    <li>{t('chapter7.p5')}<br/>
                        {t('chapter7.contact.address')}<br/>
                        {t('chapter7.contact.phone')}<br/>
                        {t('chapter7.contact.email')}
                    </li>
                </ul>
            </section>
        </div>
    )
}

export default PrivacyPolicy

