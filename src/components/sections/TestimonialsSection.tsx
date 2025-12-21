'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import type { Testimonial } from '@/types';

/**
 * Star rating component
 */
function StarRating({ rating, animated = false }: { rating: number; animated?: boolean }) {
    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                    key={star}
                    initial={animated ? { scale: 0, opacity: 0 } : {}}
                    animate={animated ? { scale: 1, opacity: 1 } : {}}
                    transition={{ delay: star * 0.1, duration: 0.3 }}
                >
                    <Star
                        className={cn(
                            'w-5 h-5',
                            star <= rating ? 'text-accent-500 fill-accent-500' : 'text-cream-300'
                        )}
                    />
                </motion.div>
            ))}
        </div>
    );
}

/**
 * Testimonial card component
 */
function TestimonialCard({ testimonial, isActive }: { testimonial: Testimonial; isActive: boolean }) {
    return (
        <div className="flex-[0_0_100%] min-w-0 px-4 sm:flex-[0_0_50%] lg:flex-[0_0_33.333%]">
            <div
                className={cn(
                    'bg-white rounded-2xl p-6 h-full border border-cream-200 transition-all duration-300',
                    isActive ? 'shadow-xl scale-100' : 'shadow-md scale-95 opacity-80'
                )}
            >
                {/* Quote Icon */}
                <div className="mb-4">
                    <Quote className="w-10 h-10 text-accent-400/30" />
                </div>

                {/* Rating */}
                <div className="mb-4">
                    <StarRating rating={testimonial.rating} animated={isActive} />
                </div>

                {/* Text */}
                <p className="text-primary-600 italic mb-6 text-base leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-cream-200">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-cream-100">
                        <Image
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                            sizes="48px"
                        />
                    </div>
                    <div>
                        <p className="font-semibold text-primary-700">{testimonial.name}</p>
                        <p className="text-sm text-primary-400">
                            {testimonial.petName} &bull; {testimonial.petType}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Testimonials section with carousel
 */
export function TestimonialsSection() {
    const { data, loading } = useBusinessData();
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        align: 'center',
        skipSnaps: false,
    });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
    const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

    // Auto-play
    useEffect(() => {
        if (!emblaApi || isHovered) return;

        const interval = setInterval(() => {
            emblaApi.scrollNext();
        }, 6000);

        return () => clearInterval(interval);
    }, [emblaApi, isHovered]);

    // Update current index
    useEffect(() => {
        if (!emblaApi) return;

        const onSelect = () => {
            setCurrentIndex(emblaApi.selectedScrollSnap());
        };

        emblaApi.on('select', onSelect);
        return () => {
            emblaApi.off('select', onSelect);
        };
    }, [emblaApi]);

    if (loading || !data) {
        return null;
    }

    return (
        <section
            id="testimonials"
            className="py-20 bg-gradient-to-b from-white to-cream-50"
            ref={ref}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge variant="accent" className="mb-4">Testimonials</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        What Pet Parents Say
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        Don&apos;t just take our word for it &ndash; hear from our happy clients
                        and their even happier pets!
                    </p>
                </motion.div>

                {/* Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={scrollPrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-primary-600 hover:text-accent-500 hover:shadow-xl transition-all hidden md:flex"
                        aria-label="Previous testimonial"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                        onClick={scrollNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-white shadow-lg text-primary-600 hover:text-accent-500 hover:shadow-xl transition-all hidden md:flex"
                        aria-label="Next testimonial"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Carousel Container */}
                    <div className="overflow-hidden md:mx-12" ref={emblaRef}>
                        <div className="flex -mx-4">
                            {data.testimonials.map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    isActive={index === currentIndex}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dots Navigation */}
                <div className="flex justify-center gap-2 mt-8">
                    {data.testimonials.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={cn(
                                'w-3 h-3 rounded-full transition-all duration-300',
                                currentIndex === index
                                    ? 'bg-accent-500 w-8'
                                    : 'bg-cream-300 hover:bg-cream-400'
                            )}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </Container>
        </section>
    );
}
