'use client';

import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { motion, type HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';
import { hoverLift } from '@/lib/animations';

type CardVariant = 'default' | 'glass' | 'elevated' | 'outline' | 'filled';

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onAnimationStart' | 'onDrag' | 'onDragEnd' | 'onDragStart'> {
    variant?: CardVariant;
    hover?: boolean;
    animated?: boolean;
    padding?: 'none' | 'sm' | 'md' | 'lg';
    children: ReactNode;
}

const variantClasses: Record<CardVariant, string> = {
    default: 'bg-white border border-cream-200 shadow-sm',
    glass: 'glass border border-white/20 shadow-lg',
    elevated: 'bg-white border border-cream-100 shadow-xl',
    outline: 'bg-transparent border-2 border-cream-300',
    filled: 'bg-cream-50 border border-cream-200',
};

const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
};

/**
 * Versatile card component with multiple variants
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            variant = 'default',
            hover = false,
            animated = false,
            padding = 'md',
            children,
            className,
            ...props
        },
        ref
    ) => {
        const cardClasses = cn(
            'rounded-2xl transition-all duration-300',
            variantClasses[variant],
            paddingClasses[padding],
            hover && 'cursor-pointer hover:shadow-lg hover:-translate-y-1',
            className
        );

        if (animated) {
            return (
                <motion.div
                    ref={ref}
                    className={cardClasses}
                    whileHover={hover ? hoverLift : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.5 }}
                    {...(props as HTMLMotionProps<'div'>)}
                >
                    {children}
                </motion.div>
            );
        }

        return (
            <div ref={ref} className={cardClasses} {...props}>
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

/**
 * Card header section
 */
interface CardHeaderProps {
    children: ReactNode;
    className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
    return (
        <div className={cn('mb-4', className)}>
            {children}
        </div>
    );
}

/**
 * Card title
 */
interface CardTitleProps {
    children: ReactNode;
    className?: string;
    as?: 'h2' | 'h3' | 'h4';
}

export function CardTitle({ children, className, as: Component = 'h3' }: CardTitleProps) {
    return (
        <Component className={cn('text-xl font-serif font-bold text-primary-700', className)}>
            {children}
        </Component>
    );
}

/**
 * Card description
 */
interface CardDescriptionProps {
    children: ReactNode;
    className?: string;
}

export function CardDescription({ children, className }: CardDescriptionProps) {
    return (
        <p className={cn('text-primary-500 text-sm mt-1', className)}>
            {children}
        </p>
    );
}

/**
 * Card content area
 */
interface CardContentProps {
    children: ReactNode;
    className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
    return (
        <div className={cn('', className)}>
            {children}
        </div>
    );
}

/**
 * Card footer section
 */
interface CardFooterProps {
    children: ReactNode;
    className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
    return (
        <div className={cn('mt-4 pt-4 border-t border-cream-200', className)}>
            {children}
        </div>
    );
}
