import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes with clsx
 * Handles conflicts and duplicates intelligently
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format phone number for tel: links
 * Removes spaces and non-numeric characters except +
 */
export function formatPhoneLink(phone: string): string {
    return phone.replace(/[^+\d]/g, '');
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

/**
 * Truncate text with ellipsis
 */
export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

/**
 * Generate full address string from Address object
 */
export function formatAddress(address: {
    street: string;
    city: string;
    state: string;
    stateAbbr: string;
    zip: string;
}): string {
    const parts = [address.street];
    if (address.city) parts.push(address.city);
    if (address.stateAbbr) {
        parts.push(address.zip ? `${address.stateAbbr} ${address.zip}` : address.stateAbbr);
    }
    return parts.join(', ');
}

/**
 * Scroll to element with smooth behavior
 */
export function scrollToElement(elementId: string): void {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Check if we're on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return (...args: Parameters<T>) => {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}
