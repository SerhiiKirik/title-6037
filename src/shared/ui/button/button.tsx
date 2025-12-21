import React from 'react';
import cn from 'clsx';
import styles from './button.module.scss';

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  type?: 'button' | 'submit';
}

export const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  fullWidth = false,
  type = 'button',
}) => (
  <button
    type={type}
    className={cn(styles.button, styles[variant], {
      [styles.fullWidth]: fullWidth,
    })}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);
