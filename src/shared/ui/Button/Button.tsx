import React, { ButtonHTMLAttributes, FC, forwardRef, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonTheme = 'blue' | 'red';

type HTMLButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

interface IProps extends HTMLButtonProps {
  theme?: ButtonTheme;
  fullWidth?: boolean;
  iconLeft?: ReactNode
  iconRight?: ReactNode
}

const Button: FC<IProps> = forwardRef<HTMLButtonElement, IProps>((props, ref) => {
  const {
    theme = 'blue',
    fullWidth = false,
    className = '',
    type = 'button',
    children,
    iconLeft,
    iconRight,
    ...otherProps
  } = props;

  const buttonClasses = [
    styles.btn,
    styles[theme],
    fullWidth ? styles.btnFull : '',
    iconLeft || iconRight ? styles.btnIcon : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClasses}
      {...otherProps}
      ref={ref}
      type={type}
    >
      {iconLeft && <span className={styles.btnIconLeft}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.btnIconRight}>{iconRight}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
