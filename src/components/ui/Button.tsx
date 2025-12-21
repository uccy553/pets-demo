'use client';

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hoverLift, tapScale } from '@/lib/animations';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'accent';
type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    animated?: boolean;
    children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 text-cream-50 hover:bg-primary-700 border-transparent shadow-lg hover:shadow-xl',
    secondary: 'bg-cream-100 text-primary-700 hover:bg-cream-200 border-cream-200',
    outline: 'bg-transparent text-primary-600 border-primary-300 hover:bg-primary-50 hover:border-primary-500',
    ghost: 'bg-transparent text-primary-600 border-transparent hover:bg-primary-50',
    accent: 'bg-gradient-to-r from-accent-400 to-accent-600 text-primary-900 hover:from-accent-500 hover:to-accent-700 border-transparent shadow-lg hover:shadow-xl',
};

const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2',
    xl: 'px-8 py-4 text-xl gap-3',
};

/**
 * Premium styled button with variants and animations
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            variant = 'primary',
            size = 'md',
            isLoading = false,
            leftIcon,
            rightIcon,
            animated = true,
            children,
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        const buttonClasses = cn(
            'inline-flex items-center justify-center font-medium rounded-full',
            'border-2 transition-all duration-300 ease-out',
            'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-500 focus-visible:ring-offset-2',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
            variantClasses[variant],
            sizeClasses[size],
            className
        );

        const content = (
            <>
                {isLoading && (
                    <svg
                        className="animate-spin h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                )}
                {!isLoading && leftIcon}
                <span>{children}</span>
                {!isLoading && rightIcon}
            </>
        );

        if (animated && !disabled && !isLoading) {
            return (
                <motion.button
                    ref={ref}
                    className={buttonClasses}
                    whileHover={hoverLift}
                    whileTap={tapScale}
                    disabled={disabled || isLoading}
                    {...(props as HTMLMotionProps<'button'>)}
                >
                    {content}
                </motion.button>
            );
        }

        return (
            <button
                ref={ref}
                className={buttonClasses}
                disabled={disabled || isLoading}
                {...props}
            >
                {content}
            </button>
        );
    }
);

Button.displayName = 'Button';
