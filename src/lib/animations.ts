import type { Variants, Transition } from 'framer-motion';

/**
 * Default transition settings
 */
export const defaultTransition: Transition = {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1], // Custom easing for smooth feel
};

export const springTransition: Transition = {
    type: 'spring',
    stiffness: 100,
    damping: 15,
};

/**
 * Fade animations
 */
export const fadeIn: Variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};

export const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: defaultTransition,
    },
    exit: { opacity: 0, y: 30 },
};

export const fadeInDown: Variants = {
    initial: { opacity: 0, y: -30 },
    animate: {
        opacity: 1,
        y: 0,
        transition: defaultTransition,
    },
    exit: { opacity: 0, y: -30 },
};

export const fadeInLeft: Variants = {
    initial: { opacity: 0, x: -50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: defaultTransition,
    },
    exit: { opacity: 0, x: -50 },
};

export const fadeInRight: Variants = {
    initial: { opacity: 0, x: 50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: defaultTransition,
    },
    exit: { opacity: 0, x: 50 },
};

/**
 * Scale animations
 */
export const scaleIn: Variants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
    exit: { opacity: 0, scale: 0.9 },
};

export const scaleInBounce: Variants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: springTransition,
    },
    exit: { opacity: 0, scale: 0.8 },
};

/**
 * Stagger container for child animations
 */
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

export const staggerContainerFast: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.05,
            delayChildren: 0.05,
        },
    },
};

export const staggerContainerSlow: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.2,
        },
    },
};

/**
 * Child item for stagger animations
 */
export const staggerItem: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
};

/**
 * Hover animations
 */
export const hoverLift = {
    scale: 1.02,
    y: -8,
    transition: { duration: 0.3, ease: 'easeOut' as const },
};

export const hoverScale = {
    scale: 1.05,
    transition: { duration: 0.3, ease: 'easeOut' as const },
};

export const tapScale = {
    scale: 0.98,
};

/**
 * Slide animations for mobile menu
 */
export const slideInFromRight: Variants = {
    initial: { x: '100%', opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        x: '100%',
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

export const slideInFromLeft: Variants = {
    initial: { x: '-100%', opacity: 0 },
    animate: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        x: '-100%',
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

/**
 * Accordion/expand collapse
 */
export const accordionContent: Variants = {
    initial: { height: 0, opacity: 0 },
    animate: {
        height: 'auto',
        opacity: 1,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

/**
 * Float animation for decorative elements
 */
export const float: Variants = {
    initial: { y: 0 },
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

/**
 * Pulse animation for icons
 */
export const pulse: Variants = {
    initial: { scale: 1 },
    animate: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
        },
    },
};

/**
 * Page transition variants
 */
export const pageTransition: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: 'easeIn' },
    },
};

/**
 * Backdrop/overlay animations
 */
export const backdrop: Variants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.2 },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

/**
 * Modal animations
 */
export const modalContent: Variants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        y: 20,
        transition: { duration: 0.2, ease: 'easeIn' },
    },
};

/**
 * Counter number animation
 */
export const counterAnimation = (endValue: number) => ({
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.5 },
    },
});
