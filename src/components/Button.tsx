'use client';

import { FC } from 'react';
import { buttonType } from '@/types/Buttontypes';

interface ExtendedButtonType extends buttonType {
  variant?: 'primary' | 'secondary' | 'cancel';
  className?: string;
}

const Button: FC<ExtendedButtonType> = ({ children, type, style, onClick, variant = 'primary', className = '' }) => {
  const baseClasses =
    'rounded-3xl font-bold pt-2 pb-2 px-6 text-kino-white cursor-pointer transition-colors duration-200';

  const variantClasses =
    variant === 'primary'
      ? 'bg-kino-darkred text-kino-white border border-kino-darkred hover:bg-kino-red hover:border-kino-red'
      : variant === 'secondary'
      ? 'bg-transparent text-kino-darkred border border-kino-darkred hover:bg-kino-red hover:text-kino-white hover:border-kino-red'
      : 'bg-transparent text-kino-white hover:opacity-80';

  return (
    <button type={type} style={style} onClick={onClick} className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
