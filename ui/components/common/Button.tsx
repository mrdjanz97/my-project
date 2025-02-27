import React, { FC, MouseEventHandler, ReactNode } from 'react';
import { classNames } from '@src/lib/utils/classname';

export type ButtonColor = 'primary' | 'secondary' | 'accent';
export type ButtonType = 'button' | 'submit' | 'reset';
export type ButtonVariant = 'filled' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case 'small':
      return 'px-4 text-xs';
    case 'large':
      return 'px-10 text-md';
    default:
      return 'px-8 text-xs';
  }
};

const getVariantClassNames = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return ' btn-outline';
    default:
      return '';
  }
};

const getColorClassNames = (color: ButtonColor) => {
  switch (color) {
    case 'secondary':
      return 'btn-secondary';
    case 'accent':
      return 'btn-accent';
    default:
      return 'btn-primary';
  }
};

interface ButtonProps {
  type?: ButtonType;
  color?: ButtonColor;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  children: ReactNode | string;
  className?: string;
  onClick?: MouseEventHandler;
}

export const Button: FC<ButtonProps> = ({
  type = 'button',
  color = 'primary',
  variant = 'filled',
  size = 'medium',
  disabled = false,
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classNames(
        'btn',
        getColorClassNames(color),
        getSizeClasses(size),
        getVariantClassNames(variant),
        className || '',
      )}>
      {children}
    </button>
  );
};
