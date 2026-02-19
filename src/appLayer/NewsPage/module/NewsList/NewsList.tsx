"use client"
import React, { useEffect, useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import s from './NewsList.module.scss'
import { FiSearch } from "react-icons/fi";
import CustomSelect from '@/shared/ui/CustomSelect/CustomSelect';
import Image from 'next/image';
import Link from 'next/link';
import useNewsStore from '@/store/useNewsStore';
import { useParams } from 'next/navigation';

const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value, delay])
    return debouncedValue
}

const NewsList = () => {
    const t = useTranslations('newsPage.newsList')
    const { locale } = useParams()
    const normalizedLocale = Array.isArray(locale) ? locale[0] : locale
    const { news, loading, fetchNews } = useNewsStore(state => state)
    
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('true')
    
    const debouncedSearchQuery = useDebounce(searchQuery, 500)

    const performSearch = useCallback((query: string, sort?: string) => {
        fetchNews({ 
            locale: normalizedLocale, 
            search: query.trim() || undefined,
            ordering: (sort || sortBy) as string,
        })
    }, [fetchNews, normalizedLocale, sortBy])
    
    useEffect(() => {
        fetchNews({ locale: normalizedLocale, ordering: sortBy })
    }, [fetchNews, normalizedLocale])

    useEffect(() => {
        performSearch(debouncedSearchQuery, sortBy)
    }, [debouncedSearchQuery, sortBy])

    // Получаем первое изображение из массива images
    const getMainImage = (item: any): string => {
        if (!item.images || item.images.length === 0) return "/image/fond/fondMain.jpg"
        const mainImage = item.images.find((img: any) => img.is_main)
        return mainImage?.image || item.images[0]?.image || "/image/fond/fondMain.jpg"
    }

    return (
        <div className={s.newsList}>
            <div className={s.filters}>
                <form className={s.search} onSubmit={(e) => e.preventDefault()}>
                    <input 
                        type="text" 
                        placeholder={t('search.placeholder')} 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button type="submit"><FiSearch /></button>
                </form>
                <div className={s.sort}>
                    <label htmlFor="sort">{t('sort.label')}</label>
                    <CustomSelect 
                        options={t.raw('sort.options') as Array<{label: string, value: string}>} 
                        defaultValue={sortBy} 
                        onChange={(value) => {
                            setSortBy(value)
                            performSearch(searchQuery, value)
                        }} 
                    />
                </div>
            </div>

            {loading && <p>{t('loading')}</p>}

            {!loading && (!news || news.length === 0) && <p>{t('empty')}</p>}

            {!loading && news && news.length > 0 && (
                <div className={s.cards}>
                    {news.map((item) => (
                        <Link href={`/news/${item.uuid}`} key={item.uuid} className={s.card}>
                            <div className={s.image}>
                                <Image
                                    src={getMainImage(item)}
                                    fill
                                    style={{ objectFit: "cover" }}
                                    alt={item.title || ''}
                                />
                            </div>
                            <div className={s.info}>
                                <p className={s.category}>
                                    {typeof item.category === 'object' && item.category !== null
                                        ? item.category.name
                                        : item.category || "Новости"}
                                </p>
                                <p className={s.title}>{item.title}</p>
                                <div className={s.avatar}>
                                    <div className={s.avatarImage} />
                                    <div className={s.avatarInfo}>
                                        <p>{item.author_name}</p>
                                        <p>{new Date(item.published_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}

export default NewsList