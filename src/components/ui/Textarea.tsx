'use client';

import { forwardRef, type TextareaHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

/**
 * Styled textarea component with floating label effect
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            helperText,
            className,
            id,
            rows = 4,
            ...props
        },
        ref
    ) => {
        const [isFocused, setIsFocused] = useState(false);
        const inputId = id || `textarea-${label?.toLowerCase().replace(/\s/g, '-')}`;

        return (
            <div className="w-full">
                <div className="relative">
                    <textarea
                        ref={ref}
                        id={inputId}
                        rows={rows}
                        className={cn(
                            'peer w-full rounded-xl border-2 bg-white px-4 py-3',
                            'text-primary-700 placeholder-transparent',
                            'transition-all duration-200 ease-out resize-none',
                            'focus:outline-none focus:ring-0',
                            error
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-cream-300 focus:border-accent-500 hover:border-cream-400',
                            className
                        )}
                        placeholder={label || ' '}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    />

                    {label && (
                        <label
                            htmlFor={inputId}
                            className={cn(
                                'absolute left-3 top-3 z-10 origin-[0] -translate-y-6 scale-75',
                                'transform bg-white px-1 font-medium text-sm',
                                'transition-all duration-200 ease-out',
                                'peer-placeholder-shown:top-3 peer-placeholder-shown:-translate-y-0 peer-placeholder-shown:scale-100',
                                'peer-focus:top-0 peer-focus:-translate-y-4 peer-focus:scale-75',
                                error
                                    ? 'text-red-500'
                                    : isFocused
                                        ? 'text-accent-600'
                                        : 'text-primary-500'
                            )}
                        >
                            {label}
                        </label>
                    )}
                </div>

                {(error || helperText) && (
                    <p
                        id={error ? `${inputId}-error` : undefined}
                        className={cn(
                            'mt-1.5 text-sm',
                            error ? 'text-red-500' : 'text-primary-400'
                        )}
                    >
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';
