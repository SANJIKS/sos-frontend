"use clientq"
import React, { useState } from 'react'
import s from './CustomSelect.module.scss'

interface Option {
  value: string
  label: string
}

interface CustomSelectProps {
  options: Option[]
  defaultValue: string
  onChange: (value: string) => void
}

const CustomSelect = ({ options, defaultValue, onChange }: CustomSelectProps) => {
  const [selectedOption, setSelectedOption] = useState(defaultValue)
  const [isOpen, setIsOpen] = useState(false)

  const handleSelect = (value: string) => {
    setSelectedOption(value)
    onChange(value)
    setIsOpen(false)
  }

  const currentLabel = options.find(o => o.value === selectedOption)?.label

  return (
    <div className={s.wrapper}>
      <div 
        className={s.selected} 
        onClick={() => setIsOpen(prev => !prev)}
      >
        {currentLabel || 'Выберите...'}
        <span className={`${s.arrow} ${isOpen ? s.open : ''}`} />
      </div>
      
      {isOpen && (
        <div className={s.options}>
          {options.map(option => (
            <div
              key={option.value}
              className={`${s.option} ${option.value === selectedOption ? s.active : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
