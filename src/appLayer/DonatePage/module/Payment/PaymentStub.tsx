'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import toast from 'react-hot-toast'

// Простая заглушка вместо сложного процесса
const PaymentStub = () => {
    const [step, setStep] = useState(1)
    const [amount, setAmount] = useState<number>(200)
    const [customAmount, setCustomAmount] = useState('')
    const [paymentType, setPaymentType] = useState<'monthly' | 'one_time'>('monthly')
    const [loading, setLoading] = useState(false)
    
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: ''
    })

    const summs = [500, 1000, 2000, 5000]

    const handleNext = () => {
        if (!amount && !customAmount) {
            toast.error('Выберите или введите сумму')
            return
        }
        setStep(2)
    }

    const handleDonate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        // Имитация задержки
        setTimeout(() => {
            setLoading(false)
            toast.success('Спасибо! Ваша заявка принята (Тестовый режим).')
            // Сброс формы
            setStep(1)
            setAmount(200)
            setCustomAmount('')
            setFormData({ name: '', phone: '', email: '' })
        }, 1500)
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: '0 auto 40px',
            padding: '30px',
            backgroundColor: '#fff',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
        }}>
            {/* Заголовок */}
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#005587', fontSize: '24px', fontWeight: 'bold' }}>
                {step === 1 ? 'Выберите сумму помощи' : 'Ваши данные'}
            </h2>

            {/* Шаг 1: Выбор суммы */}
            {step === 1 && (
                <div>
                    {/* Кнопки сумм */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '20px' }}>
                        {summs.map((sum) => (
                            <button
                                key={sum}
                                onClick={() => { setAmount(sum); setCustomAmount('') }}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '50px',
                                    border: amount === sum && !customAmount ? '2px solid #005587' : '1px solid #e0e0e0',
                                    backgroundColor: amount === sum && !customAmount ? '#005587' : '#fff',
                                    color: amount === sum && !customAmount ? '#fff' : '#333',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s'
                                }}
                            >
                                {sum} c
                            </button>
                        ))}
                    </div>

                    {/* Своя сумма */}
                    <input
                        type="number"
                        placeholder="Другая сумма"
                        value={customAmount}
                        onChange={(e) => { setCustomAmount(e.target.value); setAmount(Number(e.target.value)) }}
                        style={{
                            width: '100%',
                            padding: '15px',
                            borderRadius: '12px',
                            border: '1px solid #ddd',
                            fontSize: '16px',
                            marginBottom: '20px',
                            textAlign: 'center'
                        }}
                    />

                    {/* Тип пожертвования */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                checked={paymentType === 'monthly'} 
                                onChange={() => setPaymentType('monthly')}
                            />
                            <span>Ежемесячно</span>
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input 
                                type="radio" 
                                checked={paymentType === 'one_time'} 
                                onChange={() => setPaymentType('one_time')}
                            />
                            <span>Разово</span>
                        </label>
                    </div>

                    <button
                        onClick={handleNext}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#009fe3',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Помочь сейчас
                    </button>
                </div>
            )}

            {/* Шаг 2: Данные пользователя */}
            {step === 2 && (
                <form onSubmit={handleDonate}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '20px' }}>
                        <input
                            type="text"
                            placeholder="Ваше имя"
                            required
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
                        />
                        <input
                            type="tel"
                            placeholder="Телефон"
                            required
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            style={{ padding: '15px', borderRadius: '10px', border: '1px solid #ddd' }}
                        />
                    </div>

                    {/* Способ оплаты (Только M-Bank) */}
                    <div style={{ marginBottom: '20px' }}>
                        <p style={{ marginBottom: '10px', fontWeight: 'bold', fontSize: '14px', color: '#666' }}>Способ оплаты:</p>
                        <div style={{
                            border: '2px solid #005587',
                            borderRadius: '12px',
                            padding: '10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#f8fcff'
                        }}>
                             {/* Лого Mbank (Убедись что путь верный!) */}
                            <Image 
                                src="/image/donate/mbank.png" 
                                alt="Mbank" 
                                width={100} 
                                height={40} 
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                            type="button"
                            onClick={() => setStep(1)}
                            style={{
                                flex: 1,
                                padding: '16px',
                                backgroundColor: '#f0f0f0',
                                color: '#333',
                                border: 'none',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                cursor: 'pointer'
                            }}
                        >
                            Назад
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                flex: 2,
                                padding: '16px',
                                backgroundColor: '#009fe3',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: 'bold',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Обработка...' : `Оплатить ${amount} c`}
                        </button>
                    </div>
                </form>
            )}
        </div>
    )
}

export default PaymentStub