import React from 'react'
import s from './CustomInput.module.scss'

interface CustomInputProps {
    type: string
    placeholder: string
    value: string
    label?: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    className?: string
    disabled?: boolean
    required?: boolean
}
const CustomInput = ({
    type,
    label,
    placeholder,
    value,
    onChange,
    className,
    ...props
}: CustomInputProps) => {
    return (
        <div className={s.customInput}>
            {label && <label className={s.title}>{label}</label>}
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
                {...props}
            />
        </div>
    )
}

export default CustomInput