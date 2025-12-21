'use client';

import { useState, useCallback, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, GripHorizontal } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Badge, FeaturedBadge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem, modalContent, backdrop } from '@/lib/animations';
import type { GalleryItem } from '@/types';

const filters = [
    { value: 'all', label: 'All' },
    { value: 'dog', label: 'Dogs' },
    { value: 'cat', label: 'Cats' },
];

/**
 * Before/After slider component
 */
function BeforeAfterSlider({
    beforeImage,
    afterImage,
    petName
}: {
    beforeImage: string;
    afterImage: string;
    petName: string;
}) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const handleMove = useCallback((clientX: number) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = clientX - rect.left;
        const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
        setSliderPosition(percentage);
    }, []);

    const handleMouseDown = () => {
        isDragging.current = true;
    };

    const handleMouseUp = () => {
        isDragging.current = false;
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging.current) {
            handleMove(e.clientX);
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        handleMove(e.touches[0].clientX);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-[4/3] overflow-hidden rounded-xl cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchMove={handleTouchMove}
        >
            {/* After Image (Background) */}
            <Image
                src={afterImage}
                alt={`${petName} after grooming`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
            />

            {/* Before Image (Clipped) */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
                <Image
                    src={beforeImage}
                    alt={`${petName} before grooming`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 800px"
                />
            </div>

            {/* Slider Handle */}
            <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <GripHorizontal className="w-5 h-5 text-primary-600" />
                </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-primary-900/80 text-white text-sm rounded-full">
                Before
            </div>
            <div className="absolute bottom-4 right-4 px-3 py-1 bg-accent-500 text-primary-900 text-sm rounded-full font-medium">
                After
            </div>
        </div>
    );
}

/**
 * Gallery card component
 */
function GalleryCard({
    item,
    onSelect
}: {
    item: GalleryItem;
    onSelect: (item: GalleryItem) => void;
}) {
    return (
        <motion.div
            variants={staggerItem}
            layout
            className="group cursor-pointer"
            onClick={() => onSelect(item)}
        >
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-md group-hover:shadow-xl transition-shadow duration-300">
                <Image
                    src={item.afterImage}
                    alt={`${item.petName} - ${item.breed}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Featured Badge */}
                {item.featured && (
                    <div className="absolute top-3 left-3 z-10">
                        <FeaturedBadge />
                    </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-serif font-bold text-lg">
                        {item.petName}
                    </h3>
                    <p className="text-cream-200 text-sm">
                        {item.breed} • {item.service}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}

/**
 * Lightbox modal
 */
function GalleryLightbox({
    items,
    currentIndex,
    onClose,
    onPrev,
    onNext
}: {
    items: GalleryItem[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}) {
    const item = items[currentIndex];

    return (
        <>
            {/* Backdrop */}
            <motion.div
                variants={backdrop}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={onClose}
                className="fixed inset-0 z-50 bg-primary-900/90 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                variants={modalContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-4 z-50 flex items-center justify-center"
            >
                <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-primary-700 hover:bg-white transition-colors shadow-lg"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Navigation Arrows */}
                    {items.length > 1 && (
                        <>
                            <button
                                onClick={onPrev}
                                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 text-primary-700 hover:bg-white transition-colors shadow-lg"
                                aria-label="Previous"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={onNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/90 text-primary-700 hover:bg-white transition-colors shadow-lg"
                                aria-label="Next"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </>
                    )}

                    {/* Content */}
                    <div className="p-6">
                        <BeforeAfterSlider
                            beforeImage={item.beforeImage}
                            afterImage={item.afterImage}
                            petName={item.petName}
                        />

                        <div className="mt-4 text-center">
                            <h3 className="text-2xl font-serif font-bold text-primary-700">
                                {item.petName}
                            </h3>
                            <p className="text-primary-500">
                                {item.breed} • {item.service}
                            </p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

/**
 * Gallery section with filtering and lightbox
 */
export function GallerySection() {
    const { data, loading } = useBusinessData();
    const [activeFilter, setActiveFilter] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    if (loading || !data) {
        return null;
    }

    const filteredItems = activeFilter === 'all'
        ? data.gallery
        : data.gallery.filter(item => item.petType === activeFilter);

    const handleSelect = (item: GalleryItem) => {
        const index = filteredItems.findIndex(i => i.id === item.id);
        setLightboxIndex(index);
    };

    const handlePrev = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
        }
    };

    const handleNext = () => {
        if (lightboxIndex !== null) {
            setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
        }
    };

    return (
        <section id="gallery" className="py-20 bg-cream-50" ref={ref}>
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge variant="accent" className="mb-4">Our Work</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        Before & After Gallery
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        See the stunning transformations we achieve for our furry clients.
                        Drag the slider to compare before and after!
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex justify-center gap-2 mb-12"
                >
                    {filters.map((filter) => (
                        <button
                            key={filter.value}
                            onClick={() => setActiveFilter(filter.value)}
                            className={cn(
                                'px-6 py-2 rounded-full font-medium transition-all duration-300',
                                activeFilter === filter.value
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white text-primary-600 hover:bg-cream-100 border border-cream-200'
                            )}
                        >
                            {filter.label}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery Grid */}
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate={inView ? 'animate' : 'initial'}
                    className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredItems.map((item) => (
                            <GalleryCard
                                key={item.id}
                                item={item}
                                onSelect={handleSelect}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>
            </Container>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxIndex !== null && (
                    <GalleryLightbox
                        items={filteredItems}
                        currentIndex={lightboxIndex}
                        onClose={() => setLightboxIndex(null)}
                        onPrev={handlePrev}
                        onNext={handleNext}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
