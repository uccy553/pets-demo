import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type BadgeVariant = 'default' | 'accent' | 'success' | 'warning' | 'outline' | 'primary';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
    variant?: BadgeVariant;
    size?: BadgeSize;
    children: ReactNode;
    className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
    default: 'bg-cream-100 text-primary-600 border-cream-200',
    accent: 'bg-accent-500 text-primary-900 border-accent-600',
    success: 'bg-sage-400 text-primary-800 border-sage-500',
    warning: 'bg-accent-300 text-primary-800 border-accent-400',
    outline: 'bg-transparent text-primary-600 border-primary-300',
    primary: 'bg-primary-600 text-cream-50 border-primary-700',
};

const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
};

/**
 * Badge component for labels, prices, and status indicators
 */
export function Badge({
    variant = 'default',
    size = 'md',
    children,
    className
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center justify-center font-medium rounded-full border',
                'transition-colors duration-200',
                variantClasses[variant],
                sizeClasses[size],
                className
            )}
        >
            {children}
        </span>
    );
}

/**
 * Price badge specifically styled for service pricing
 */
interface PriceBadgeProps {
    price: number;
    prefix?: string;
    className?: string;
}

export function PriceBadge({ price, prefix = 'From', className }: PriceBadgeProps) {
    return (
        <Badge variant="accent" size="md" className={cn('font-bold', className)}>
            {prefix} ${price}
        </Badge>
    );
}

/**
 * Featured badge for highlighting items
 */
export function FeaturedBadge({ className }: { className?: string }) {
    return (
        <Badge
            variant="accent"
            size="sm"
            className={cn('uppercase tracking-wider', className)}
        >
            ★ Featured
        </Badge>
    );
}
