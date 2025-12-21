'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem, float } from '@/lib/animations';

/**
 * Hero section with full-screen carousel and animated content
 */
export function HeroSection() {
    const { data, loading } = useBusinessData();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-play carousel
    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 5000);

        return () => clearInterval(interval);
    }, [emblaApi, isHovered]);

    // Update current slide indicator
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentSlide(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    const scrollTo = useCallback(
        (index: number) => {
            if (emblaApi) emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const handleCTAClick = (href: string) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (loading || !data) {
        return (
            <section className="relative min-h-screen bg-primary-700 flex items-center justify-center">
                <div className="animate-pulse text-cream-100">Loading...</div>
            </section>
        );
    }

    const { hero } = data;

    return (
        <section
            id="hero"
            className="relative min-h-screen overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background Carousel */}
            <div className="absolute inset-0" ref={emblaRef}>
                <div className="flex h-full">
                    {hero.carouselImages.map((image, index) => (
                        <div
                            key={index}
                            className="relative flex-[0_0_100%] min-w-0 h-full"
                        >
                            <Image
                                src={image.url}
                                alt={image.alt}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                sizes="100vw"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary-900/40 via-primary-900/60 to-primary-900" />

            {/* Floating Paw Prints - Decorative */}
            <motion.div
                variants={float}
                initial="initial"
                animate="animate"
                className="absolute top-20 left-10 w-20 h-20 text-accent-400/20 hidden lg:block"
            >
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="30" cy="25" rx="12" ry="15" />
                    <ellipse cx="70" cy="25" rx="12" ry="15" />
                    <ellipse cx="15" cy="55" rx="10" ry="12" />
                    <ellipse cx="85" cy="55" rx="10" ry="12" />
                    <ellipse cx="50" cy="65" rx="25" ry="22" />
                </svg>
            </motion.div>

            <motion.div
                variants={float}
                initial="initial"
                animate="animate"
                style={{ animationDelay: '1s' }}
                className="absolute bottom-40 right-20 w-16 h-16 text-sage-400/15 hidden lg:block"
            >
                <svg viewBox="0 0 100 100" fill="currentColor">
                    <ellipse cx="30" cy="25" rx="12" ry="15" />
                    <ellipse cx="70" cy="25" rx="12" ry="15" />
                    <ellipse cx="15" cy="55" rx="10" ry="12" />
                    <ellipse cx="85" cy="55" rx="10" ry="12" />
                    <ellipse cx="50" cy="65" rx="25" ry="22" />
                </svg>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <Container>
                    <motion.div
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="max-w-4xl mx-auto text-center"
                    >
                        {/* Main Heading */}
                        <motion.h1
                            variants={staggerItem}
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-6 leading-tight"
                        >
                            {hero.mainHeading}
                        </motion.h1>

                        {/* Subheading */}
                        <motion.p
                            variants={staggerItem}
                            className="text-lg sm:text-xl md:text-2xl text-cream-100/90 mb-4"
                        >
                            {hero.subHeading}
                        </motion.p>

                        {/* Description */}
                        <motion.p
                            variants={staggerItem}
                            className="text-base sm:text-lg text-cream-200/80 mb-8 max-w-2xl mx-auto"
                        >
                            {hero.description}
                        </motion.p>

                        {/* CTAs */}
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <Button
                                variant="accent"
                                size="lg"
                                onClick={() => handleCTAClick(hero.ctaPrimary.link)}
                            >
                                {hero.ctaPrimary.text}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-white/50 text-white hover:bg-white/10 hover:border-white"
                                onClick={() => handleCTAClick(hero.ctaSecondary.link)}
                            >
                                {hero.ctaSecondary.text}
                            </Button>
                        </motion.div>
                    </motion.div>
                </Container>
            </div>

            {/* Carousel Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
                {hero.carouselImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            'w-3 h-3 rounded-full transition-all duration-300',
                            currentSlide === index
                                ? 'bg-accent-500 w-8'
                                : 'bg-white/50 hover:bg-white/80'
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-6 h-10 rounded-full border-2 border-white/40 flex justify-center pt-2"
                >
                    <div className="w-1.5 h-3 bg-white/60 rounded-full" />
                </motion.div>
            </motion.div>
        </section>
    );
}
