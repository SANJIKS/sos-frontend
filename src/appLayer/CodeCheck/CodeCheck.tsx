'use client'

import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import s from './CodeCheck.module.scss'
import { classNames } from "@/shared/lib/classNames";
import Button from '@/shared/ui/Button/Button'
import AuthBanner from '@/widget/Auth/AuthBanner'
import {useAuthStore} from '@/store/useAuthStore'
import { toast } from 'react-hot-toast';
import {useRouter} from '@/i18n/navigation'
import { getErrorMessage, isFieldErrors } from '@/shared/lib/errorHandler'

const CodeCheck: React.FC = () => {
    const inputRef = useRef<HTMLInputElement | null>(null)
    const [code, setCode] = useState<string>('')

    const [currentCode, setCurrentCode] = useState<number>(0)
    const [isCodeError, setIsCodeError] = useState<boolean>(false)
    const [isCodeSuccess, setIsCodeSuccess] = useState<boolean>(false)

    const { verifyAccount,  loading, email } = useAuthStore()
    const router = useRouter();

    const handleCode = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length <= 6) {
            setCode(value)
        }
    }

    const handleVerify = async () => {
        if (!code || code.length < 6) return;

        const res = await verifyAccount({ email, code });

        if (res?.success) {
            setIsCodeSuccess(true);
            setIsCodeError(false);
            toast.success('Код подтверждён!');
            router.push('/login');
        } else {
            setIsCodeError(true);
            setIsCodeSuccess(false);
            const errorMsg = res?.error 
                ? (isFieldErrors(res.error) && res.error.general?.[0] 
                    ? res.error.general[0] 
                    : getErrorMessage(res.error))
                : 'Неверный код';
            toast.error(errorMsg);
        }
    }

    useEffect(() => {
        setCurrentCode(code.length)
    }, [code])

    return (
        <section className={s.container}>
            <AuthBanner className={s.authBanner}/>
            <div className={s.authCodeCheck}>
                <h1 className={s.authCodeCheckTitle}>Проверка кода</h1>
                <p className={s.authCodeCheckDescription}>
                    Проверьте свою электронную почту, чтобы увидеть код подтверждения
                </p>

                <div className={s.authCodeCheckInput}>
                    <div className={s.authCodeCheckInputCodeList}>
                        {[0, 1, 2, 3, 4, 5].map((item) => (
                            <span
                                key={item}
                                className={classNames(s.codeItem, {
                                    [s.codeItemActive]: currentCode === item,
                                    [s.codeItemError]: isCodeError,
                                    [s.codeItemSuccess]: isCodeSuccess,
                                })}
                            >
                                {code.length > item ? code[item] : currentCode === item ? '|' : ''}
                            </span>
                        ))}
                    </div>

                    <input
                        type='number'
                        ref={inputRef}
                        value={code}
                        onChange={handleCode}
                        autoFocus
                        maxLength={6}
                        aria-label='Код подтверждения'
                    />
                </div>

                {/* Ошибки */}
                {/*{error?.code && <p className={s.codeError}>{error.code[0]}</p>}*/}
                {/*{error?.general && <p className={s.codeError}>{error.general[0]}</p>}*/}

                <Button
                    fullWidth
                    className={s.authCodeCheckButton}
                    onClick={handleVerify}
                    disabled={loading}
                >
                    Подтвердить
                </Button>
            </div>
        </section>
    )
}

export default CodeCheck
