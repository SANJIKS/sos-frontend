import React, {FC, InputHTMLAttributes, ReactNode} from 'react'
import styles from './Input.module.scss'
import classNames from 'classnames'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string
    error?: boolean
    errorMessage?: string |  null |  undefined
    className?: string
    iconLeft?: ReactNode
    iconRight?: ReactNode

    onClickRightIcon?: () => void
}

const Input: FC<IProps> = ({
                               label,
                               error = false,
                               errorMessage,
                               className = '',
                               iconLeft,
                               iconRight,
                               onClickRightIcon,
                               ...props
                           }) => {
    return (
        <div className={styles.inputGroup}>
            {label && <label className={styles.inputLabel}>{label}</label>}

            <div className={styles.inputWrapper}>
                {iconLeft && <span className={styles.iconLeft}>{iconLeft}</span>}
                <input
                    className={classNames(styles.inputField, {[styles.error]: error}, className)}
                    {...props}
                />
                {iconRight && (
                    <span
                        className={styles.iconRight}
                        onClick={onClickRightIcon}
                    >
            {iconRight}
          </span>
                )}
            </div>

            {error && errorMessage && (
                <p className={styles.inputErrorMessage}>{errorMessage}</p>
            )}
        </div>
    )
}

export default Input
