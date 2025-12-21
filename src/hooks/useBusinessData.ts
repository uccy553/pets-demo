'use client';

import { useState, useEffect } from 'react';
import type { BusinessData } from '@/types';

interface UseBusinessDataReturn {
    data: BusinessData | null;
    loading: boolean;
    error: string | null;
}

/**
 * Hook to fetch and cache business data from data.json
 * All website content is loaded dynamically through this hook
 */
export function useBusinessData(): UseBusinessDataReturn {
    const [data, setData] = useState<BusinessData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');

                if (!response.ok) {
                    throw new Error(`Failed to load data: ${response.status}`);
                }

                const jsonData: BusinessData = await response.json();

                if (isMounted) {
                    setData(jsonData);
                    setLoading(false);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err instanceof Error ? err.message : 'An error occurred');
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, []);

    return { data, loading, error };
}

/**
 * Server-side function to get business data
 * For use in server components and metadata generation
 */
export async function getBusinessData(): Promise<BusinessData> {
    // In development, use fetch with absolute URL
    // In production, read from public folder
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/data.json`, {
        next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
        throw new Error('Failed to load business data');
    }

    return response.json();
}
