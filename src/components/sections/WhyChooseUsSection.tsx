'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    Award, Heart, Sparkles, ClipboardList, CheckCircle
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { fadeInLeft, fadeInRight, fadeInUp } from '@/lib/animations';
import type { WhyChooseUsItem } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    certificate: Award,
    award: Award,
    heart: Heart,
    sparkles: Sparkles,
    clipboard: ClipboardList,
};

/**
 * Single feature item with alternating layout
 */
function FeatureItem({
    item,
    index
}: {
    item: WhyChooseUsItem;
    index: number;
}) {
    const isEven = index % 2 === 0;
    const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
    const IconComponent = iconMap[item.icon] || CheckCircle;

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={inView ? 'animate' : 'initial'}
            className={cn(
                'grid md:grid-cols-2 gap-8 lg:gap-16 items-center',
                isEven ? '' : 'md:direction-rtl'
            )}
        >
            {/* Image */}
            <motion.div
                variants={isEven ? fadeInLeft : fadeInRight}
                className={cn(
                    'relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl group',
                    !isEven && 'md:order-2'
                )}
            >
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>

            {/* Content */}
            <motion.div
                variants={isEven ? fadeInRight : fadeInLeft}
                className={cn(
                    'md:direction-ltr',
                    !isEven && 'md:order-1'
                )}
            >
                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 flex items-center justify-center mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-primary-700 mb-4">
                    {item.title}
                </h3>

                <p className="text-lg text-primary-500 leading-relaxed">
                    {item.description}
                </p>
            </motion.div>
        </motion.div>
    );
}

/**
 * Why Choose Us section with alternating image/text layout
 */
export function WhyChooseUsSection() {
    const { data, loading } = useBusinessData();
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    if (loading || !data) {
        return null;
    }

    return (
        <section id="why-us" className="py-20 bg-white" ref={ref}>
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <Badge variant="accent" className="mb-4">Why Choose Us</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        The Difference is in the Details
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        We&apos;re not just groomers &ndash; we&apos;re pet lovers dedicated to providing
                        exceptional care and stunning results.
                    </p>
                </motion.div>

                {/* Features */}
                <div className="space-y-20 lg:space-y-28">
                    {data.whyChooseUs.map((item, index) => (
                        <FeatureItem key={index} item={item} index={index} />
                    ))}
                </div>
            </Container>
        </section>
    );
}
