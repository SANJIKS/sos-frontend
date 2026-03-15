'use client'
import React, { useEffect, useState, useCallback } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import s from './SuccessStoriesPage.module.scss'
import useSuccessStoriesStore from '@/store/useSuccessStoriesStore'
import DonationForm from '@/shared/ui/DonationForm/DonationForm'
import BannerPages from '@/shared/ui/BannerPages/BannerPages'

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = React.useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

const SuccessStoriesPage = () => {
    const { locale } = useParams()
    const normalizedLocale = Array.isArray(locale) ? locale[0] : locale
    const { stories, loading, fetchStories } = useSuccessStoriesStore()
    const [search, setSearch] = useState('')
    const debouncedSearch = useDebounce(search, 500)

    useEffect(() => {
        fetchStories({ locale: normalizedLocale, story_type: 'success' })
    }, [normalizedLocale])

    useEffect(() => {
        fetchStories({ locale: normalizedLocale, story_type: 'success', search: debouncedSearch })
    }, [debouncedSearch])

    const titles: Record<string, string> = {
        ru: 'Истории успеха',
        ky: 'Ийгилик жөнүндө окуялар',
        en: 'Success Stories'
    }

    const placeholders: Record<string, string> = {
        ru: 'Поиск историй...',
        ky: 'Издөө...',
        en: 'Search stories...'
    }

    const emptyTexts: Record<string, string> = {
        ru: 'Истории не найдены',
        ky: 'Окуялар табылган жок',
        en: 'No stories found'
    }

    const loc = (normalizedLocale as string) || 'ru'

    return (
        <div className={s.page}>
            <BannerPages url="/image/fond/fondMain.jpg">
                <div className={s.bannerTitle}>
                    <h1>{titles[loc] ?? titles['ru']}</h1>
                </div>
            </BannerPages>

            <div className={s.container}>
                {/* Поиск */}
                <div className={s.searchWrapper}>
                    <input
                        type="text"
                        placeholder={placeholders[loc] ?? placeholders['ru']}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className={s.searchInput}
                    />
                </div>

                {/* Карточки */}
                {loading && <p className={s.message}>Загрузка...</p>}
                {!loading && (!stories || stories.length === 0) && (
                    <p className={s.message}>{emptyTexts[loc] ?? emptyTexts['ru']}</p>
                )}

                {!loading && stories && stories.length > 0 && (
                    <div className={s.grid}>
                        {stories.map((story, index) => (
                            <div key={story.uuid} className={s.card}>
                                <div className={s.image}>
                                    <Image
                                        src={story.author_image || `/image/donate/success-stories-item-${index % 3}.jpg`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                        alt={story.title || ''}
                                    />
                                    <div className={s.imageOverlay}>
                                        <h3>{story.title}</h3>
                                    </div>
                                </div>
                                <div className={s.info}>
                                    <p className={s.quote}>{story.quote_text}</p>
                                    <div className={s.author}>
                                        <div className={s.authorAvatar}>
                                            {story.author_image
                                                ? <Image src={story.author_image} fill style={{ objectFit: 'cover' }} alt={story.author_name} />
                                                : <div className={s.avatarPlaceholder} />
                                            }
                                        </div>
                                        <div>
                                            <p className={s.authorName}>{story.author_name}</p>
                                            <p className={s.authorPosition}>{story.author_position}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <DonationForm />
            </div>
        </div>
    )
}

export default SuccessStoriesPage