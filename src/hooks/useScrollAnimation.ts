'use client';

import { useRef, useEffect, useState } from 'react';

interface UseScrollAnimationOptions {
    threshold?: number;
    triggerOnce?: boolean;
    rootMargin?: string;
}

interface UseScrollAnimationReturn {
    ref: React.RefObject<HTMLElement | null>;
    isInView: boolean;
    hasAnimated: boolean;
}

/**
 * Hook for scroll-triggered animations using Intersection Observer
 * Provides ref and animation state for elements
 */
export function useScrollAnimation(
    options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
    const {
        threshold = 0.2,
        triggerOnce = true,
        rootMargin = '0px 0px -100px 0px'
    } = options;

    const ref = useRef<HTMLElement | null>(null);
    const [isInView, setIsInView] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const inView = entry.isIntersecting;

                if (inView && !hasAnimated) {
                    setIsInView(true);
                    if (triggerOnce) {
                        setHasAnimated(true);
                    }
                } else if (!triggerOnce) {
                    setIsInView(inView);
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, triggerOnce, rootMargin, hasAnimated]);

    return { ref, isInView, hasAnimated };
}

/**
 * Hook for counting animation
 * Counts up from 0 to target value when triggered
 */
export function useCountUp(
    targetValue: number,
    duration: number = 2000,
    isTriggered: boolean = false
): number {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!isTriggered) return;

        let startTime: number | null = null;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (startTime === null) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);

            setCount(Math.floor(easeOutQuart * targetValue));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [targetValue, duration, isTriggered]);

    return count;
}

/**
 * Hook for scroll progress
 * Returns 0-1 based on scroll position
 */
export function useScrollProgress(): number {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            setProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return progress;
}

/**
 * Hook to detect if user has scrolled past a certain point
 */
export function useScrolled(threshold: number = 50): boolean {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > threshold);
        };

        handleScroll(); // Check initial state
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
}
