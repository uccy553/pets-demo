'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { PawPrint, Award, Shield, Star, Clock, Heart, Users, CheckCircle } from 'lucide-react';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';
import type { TrustBarItem } from '@/types';

// Icon mapping for trust bar items
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    pawPrint: PawPrint,
    award: Award,
    shield: Shield,
    star: Star,
    clock: Clock,
    heart: Heart,
    users: Users,
    checkCircle: CheckCircle,
}
/**
 * Animated counter that counts up when component mounts
 */
function CountUp({ target }: { target: string }) {
    // Extract numeric value from string like "500+" or "100%"
    const numericValue = parseInt(target.replace(/[^0-9]/g, '')) || 0;
    const suffix = target.replace(/[0-9]/g, '');

    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        if (hasAnimated) return;

        setHasAnimated(true);

        const duration = 2000;
        const startTime = Date.now();

        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(easeProgress * numericValue);

            setCount(currentValue);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(numericValue);
            }
        };

        requestAnimationFrame(animate);
    }, [hasAnimated, numericValue]);

    return (
        <span>
            {count}{suffix}
        </span>
    );
}

/**
 * Single trust bar stat item
 */
function TrustItem({ item }: { item: TrustBarItem }) {
    const IconComponent = iconMap[item.icon] || Star;

    return (
        <motion.div
            variants={staggerItem}
            className="flex flex-col items-center text-center py-4"
        >
            <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 rounded-full bg-accent-500/20 flex items-center justify-center mb-3"
            >
                <IconComponent className="w-6 h-6 text-accent-400" />
            </motion.div>
            <span className="text-3xl sm:text-4xl font-bold text-white mb-1">
                <CountUp target={item.value} />
            </span>
            <span className="text-sm sm:text-base text-cream-200">
                {item.label}
            </span>
        </motion.div>
    );
}

/**
 * Trust bar section with animated statistics
 */
export function TrustBar() {
    const { data, loading } = useBusinessData();

    if (loading || !data) {
        return null;
    }

    return (
        <section className="relative z-20 py-6 bg-primary-700">
            <Container>
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
                >
                    {data.trustBar.map((item, index) => (
                        <TrustItem
                            key={index}
                            item={item}
                        />
                    ))}
                </motion.div>
            </Container>
        </section>
    );
}
