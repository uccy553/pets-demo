'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

/**
 * Loading spinner for async content
 */
export function LoadingSpinner({ size = 'md', className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
    };

    return (
        <div className={cn('flex items-center justify-center', className)}>
            <div
                className={cn(
                    'animate-spin rounded-full border-2 border-cream-300 border-t-accent-500',
                    sizeClasses[size]
                )}
                role="status"
                aria-label="Loading"
            >
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
}

/**
 * Full page loading state
 */
export function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream-50">
            <div className="text-center">
                <LoadingSpinner size="lg" />
                <p className="mt-4 text-primary-500 animate-pulse">Loading...</p>
            </div>
        </div>
    );
}

/**
 * Skeleton loader for content placeholders
 */
interface SkeletonProps {
    className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
    return (
        <div
            className={cn(
                'animate-pulse bg-cream-200 rounded-lg',
                className
            )}
        />
    );
}

/**
 * Card skeleton for loading states
 */
export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl p-6 border border-cream-200">
            <Skeleton className="w-12 h-12 rounded-full mb-4" />
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-5/6" />
        </div>
    );
}
