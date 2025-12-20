import React from 'react';
import styles from './button.module.css';

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
}) => {
  const classNames = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
  ].join(' ');

  return (
    <button
      type={type}
      className={classNames}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
