'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { accordionContent } from '@/lib/animations';
import type { FAQ } from '@/types';

/**
 * Single FAQ accordion item
 */
function FAQItem({
    faq,
    isOpen,
    onToggle,
    index
}: {
    faq: FAQ;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}) {
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b border-cream-200 last:border-b-0"
        >
            <button
                onClick={onToggle}
                className="w-full py-5 flex items-center justify-between text-left group"
                aria-expanded={isOpen}
            >
                <span className={cn(
                    'text-lg font-semibold transition-colors duration-200',
                    isOpen ? 'text-accent-600' : 'text-primary-700 group-hover:text-accent-500'
                )}>
                    {faq.question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                        'flex-shrink-0 ml-4 p-1 rounded-full transition-colors duration-200',
                        isOpen ? 'bg-accent-100 text-accent-600' : 'text-primary-400 group-hover:text-accent-500'
                    )}
                >
                    <ChevronDown className="w-5 h-5" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        variants={accordionContent}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="overflow-hidden"
                    >
                        <div className="pb-5 pr-12">
                            <p className="text-primary-600 leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

/**
 * FAQ section with accordion
 */
export function FAQSection() {
    const { data, loading } = useBusinessData();
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    if (loading || !data) {
        return null;
    }

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faqs" className="py-20 bg-white" ref={ref}>
            <Container size="md">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge variant="accent" className="mb-4">FAQs</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        Got questions? We&apos;ve got answers! If you don&apos;t find what you&apos;re
                        looking for, feel free to contact us.
                    </p>
                </motion.div>

                {/* FAQ List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="bg-cream-50 rounded-2xl p-6 sm:p-8 shadow-sm"
                >
                    {data.faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            faq={faq}
                            isOpen={openIndex === index}
                            onToggle={() => handleToggle(index)}
                            index={index}
                        />
                    ))}
                </motion.div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center mt-10"
                >
                    <p className="text-primary-500 mb-4 flex items-center justify-center gap-2">
                        <HelpCircle className="w-5 h-5" />
                        Still have questions?
                    </p>
                    <a
                        href="#contact"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-accent-600 font-semibold hover:text-accent-700 underline underline-offset-4"
                    >
                        Contact us directly
                    </a>
                </motion.div>
            </Container>
        </section>
    );
}
