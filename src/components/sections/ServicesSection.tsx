'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Scissors, Bath, Heart, PawPrint, Smile, Wind, Bug, Clock,
    ChevronRight, X
} from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge, PriceBadge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { staggerContainer, staggerItem, modalContent, backdrop } from '@/lib/animations';
import type { Service, ServiceCategory } from '@/types';

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    scissors: Scissors,
    bath: Bath,
    heart: Heart,
    paw: PawPrint,
    smile: Smile,
    wind: Wind,
    bug: Bug,
    clock: Clock,
};

// Category labels
const categoryLabels: Record<ServiceCategory, string> = {
    'full-service': 'Full Service',
    'basic': 'Basic',
    'specialty': 'Specialty',
    'addon': 'Add-ons',
};

const categories: Array<{ value: string; label: string }> = [
    { value: 'all', label: 'All Services' },
    { value: 'full-service', label: 'Full Service' },
    { value: 'basic', label: 'Basic' },
    { value: 'specialty', label: 'Specialty' },
    { value: 'addon', label: 'Add-ons' },
];

/**
 * Service card component
 */
function ServiceCard({
    service,
    onSelect
}: {
    service: Service;
    onSelect: (service: Service) => void;
}) {
    const IconComponent = iconMap[service.icon] || Scissors;

    return (
        <Card
            hover
            className="h-full group cursor-pointer"
            onClick={() => onSelect(service)}
        >
            <div className="flex flex-col h-full">
                {/* Icon & Category */}
                <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent-400/20 to-accent-500/10 flex items-center justify-center group-hover:from-accent-400/30 group-hover:to-accent-500/20 transition-colors">
                        <IconComponent className="w-7 h-7 text-accent-600" />
                    </div>
                    <Badge variant="default" size="sm">
                        {categoryLabels[service.category]}
                    </Badge>
                </div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold text-primary-700 mb-2 group-hover:text-accent-600 transition-colors">
                    {service.name}
                </h3>

                <p className="text-primary-500 text-sm mb-4 flex-1">
                    {service.shortDescription}
                </p>

                {/* Price & Duration */}
                <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                    <PriceBadge price={service.priceFrom} />
                    <span className="text-sm text-primary-400 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {service.duration}
                    </span>
                </div>
            </div>
        </Card>
    );
}

/**
 * Service detail modal
 */
function ServiceModal({
    service,
    onClose
}: {
    service: Service;
    onClose: () => void;
}) {
    const IconComponent = iconMap[service.icon] || Scissors;

    return (
        <>
            {/* Backdrop */}
            <motion.div
                variants={backdrop}
                initial="initial"
                animate="animate"
                exit="exit"
                onClick={onClose}
                className="fixed inset-0 z-50 bg-primary-900/60 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
                variants={modalContent}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            >
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-lg max-h-[85vh] flex flex-col">
                    {/* Header */}
                    <div className="relative bg-gradient-to-r from-primary-600 to-primary-700 p-4 sm:p-6 flex-shrink-0">
                        <button
                            onClick={onClose}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="flex items-center gap-3 sm:gap-4 pr-10">
                            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                            </div>
                            <div className="min-w-0">
                                <Badge variant="accent" size="sm" className="mb-1 sm:mb-2">
                                    {categoryLabels[service.category]}
                                </Badge>
                                <h3 className="text-lg sm:text-2xl font-serif font-bold text-white leading-tight">
                                    {service.name}
                                </h3>
                            </div>
                        </div>
                    </div>

                    {/* Content - Scrollable */}
                    <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                        <p className="text-primary-600 mb-4 sm:mb-6 text-sm sm:text-base">
                            {service.fullDescription}
                        </p>

                        {/* Includes */}
                        <h4 className="font-semibold text-primary-700 mb-2 sm:mb-3 text-sm sm:text-base">
                            What&apos;s Included:
                        </h4>
                        <ul className="space-y-2 mb-4 sm:mb-6">
                            {service.includes.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 text-primary-600 text-sm sm:text-base">
                                    <ChevronRight className="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" />
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-cream-200">
                            <div>
                                <span className="text-xs sm:text-sm text-primary-400">Starting at</span>
                                <p className="text-xl sm:text-2xl font-bold text-accent-600">
                                    ${service.priceFrom}
                                </p>
                            </div>
                            <Button
                                variant="accent"
                                size="sm"
                                className="sm:!px-6 sm:!py-2.5"
                                onClick={() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                    onClose();
                                }}
                            >
                                Book Now
                            </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}

/**
 * Services section with filtering and detail modals
 */
export function ServicesSection() {
    const { data, loading } = useBusinessData();
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    if (loading || !data) {
        return null;
    }

    const filteredServices = activeCategory === 'all'
        ? data.services
        : data.services.filter(s => s.category === activeCategory);

    return (
        <section id="services" className="py-20 bg-cream-50" ref={ref}>
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge variant="accent" className="mb-4">Our Services</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        Premium Grooming Services
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        From basic baths to full transformations, we offer comprehensive grooming
                        services tailored to your pet&apos;s unique needs.
                    </p>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 mb-12"
                >
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => setActiveCategory(category.value)}
                            className={cn(
                                'px-4 py-2 rounded-full font-medium transition-all duration-300',
                                activeCategory === category.value
                                    ? 'bg-primary-600 text-white shadow-lg'
                                    : 'bg-white text-primary-600 hover:bg-cream-100 border border-cream-200'
                            )}
                        >
                            {category.label}
                        </button>
                    ))}
                </motion.div>

                {/* Services Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    >
                        {filteredServices.map((service, index) => (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                            >
                                <ServiceCard
                                    service={service}
                                    onSelect={setSelectedService}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </Container>

            {/* Service Detail Modal */}
            <AnimatePresence>
                {selectedService && (
                    <ServiceModal
                        service={selectedService}
                        onClose={() => setSelectedService(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
}
