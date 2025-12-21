'use client';

import { forwardRef, type SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    placeholder?: string;
}

/**
 * Styled select component matching the Input design
 */
export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            helperText,
            options,
            placeholder = 'Select an option',
            className,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || `select-${label?.toLowerCase().replace(/\s/g, '-')}`;

        return (
            <div className="w-full">
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            'block mb-1.5 text-sm font-medium',
                            error ? 'text-red-500' : 'text-primary-600'
                        )}
                    >
                        {label}
                    </label>
                )}

                <div className="relative">
                    <select
                        ref={ref}
                        id={inputId}
                        className={cn(
                            'w-full rounded-xl border-2 bg-white px-4 py-3 pr-10',
                            'text-primary-700 appearance-none cursor-pointer',
                            'transition-all duration-200 ease-out',
                            'focus:outline-none focus:ring-0',
                            error
                                ? 'border-red-400 focus:border-red-500'
                                : 'border-cream-300 focus:border-accent-500 hover:border-cream-400',
                            className
                        )}
                        aria-invalid={error ? 'true' : 'false'}
                        aria-describedby={error ? `${inputId}-error` : undefined}
                        {...props}
                    >
                        <option value="" disabled>
                            {placeholder}
                        </option>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>

                    <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400 pointer-events-none"
                    />
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

Select.displayName = 'Select';
