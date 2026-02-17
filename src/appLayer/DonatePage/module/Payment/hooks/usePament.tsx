'use client'
import {useEffect, useState} from 'react'
import {Payment} from '../type'
// import {createPaymentUnified} from '@/services/donation.service' // Отключили реальный сервис
import {useAuthStore} from '@/store/useAuthStore'
import {toast} from 'react-hot-toast'
// import { logger } from '@/shared/lib/logger' // Отключили логгер

export const usePament = () => {
    const { user, isAuthenticated } = useAuthStore()
    const [stages, setStages] = useState(1)
    const [globalStages, setGlobalStages] = useState(0)
    const [loading, setLoading] = useState(false)
    const [captchaToken, setCaptchaToken] = useState<string | null>(null)
    const [payment, setPayment] = useState<Payment>({
        sum: null,
        type: null,
        user: {
            name: isAuthenticated && user ? user.first_name : '',
            surname: isAuthenticated && user ? user.last_name : '',
            email: isAuthenticated && user ? user.email : '',
            phone: isAuthenticated && user ? String(user.phone) : ''
        }
    })

    useEffect(() => {
        if (isAuthenticated && user) {
            setPayment(prev => ({
                ...prev,
                user: {
                    name: user.first_name,
                    surname: user.last_name,
                    email: user.email,
                    phone: String(user.phone)
                }
            }))
        }
    }, [user, isAuthenticated])

    const handleSumClick = (sum: number) => {
        setPayment({...payment, sum})
    }
    const handleTypeChange = (type: 'one_time' | 'monthly' | 'yearly') => {
        setPayment({...payment, type})
    }

    // --- ИЗМЕНЕННАЯ ФУНКЦИЯ ОПЛАТЫ (ЗАГЛУШКА) ---
    const createPayment = async () => {
        setLoading(true)
        try {
            // 1. Имитируем ожидание сервера (1.5 секунды)
            await new Promise(resolve => setTimeout(resolve, 1500))

            // 2. Всегда показываем успех
            toast.success('Спасибо! Ваша заявка принята (Демо-режим).')
            
            console.log('Данные платежа (не отправлены):', {
                amount: payment.sum,
                type: payment.type,
                user: payment.user
            })

            // Опционально: перенаправить куда-то или очистить форму
            // window.location.href = '/success' 

        } catch (err) {
            console.error(err)
            toast.error('Произошла ошибка')
        } finally {
            setLoading(false)
        }
    }

    return {
        payment,
        setPayment,
        setStages,
        stages,
        loading,
        handleSumClick,
        handleTypeChange,
        createPayment,
        isAuthenticated,
        captchaToken,
        setCaptchaToken,
        globalStages,
        setGlobalStages,
    }
}