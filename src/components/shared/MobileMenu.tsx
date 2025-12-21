'use client';

import { motion } from 'framer-motion';
import { X, Phone, Mail, MapPin } from 'lucide-react';
import { useBusinessData } from '@/hooks';
import { formatPhoneLink, formatAddress } from '@/lib/utils';
import { slideInFromRight, backdrop, staggerContainer, staggerItem } from '@/lib/animations';
import { Button } from '@/components/ui/Button';

interface NavLink {
    label: string;
    href: string;
}

interface MobileMenuProps {
    navLinks: NavLink[];
    onClose: () => void;
    onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

/**
 * Full-screen mobile navigation menu with smooth animations
 */
export function MobileMenu({ navLinks, onClose, onNavClick }: MobileMenuProps) {
    const { data } = useBusinessData();

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

            {/* Menu Panel */}
            <motion.div
                variants={slideInFromRight}
                initial="initial"
                animate="animate"
                exit="exit"
                className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-white shadow-2xl"
            >
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-cream-200">
                        <span className="font-serif font-bold text-xl text-primary-700">
                            {data?.businessInfo.name || 'Menu'}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg text-primary-600 hover:bg-cream-100 transition-colors"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Navigation Links */}
                    <motion.nav
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                        className="flex-1 p-6"
                    >
                        <ul className="space-y-4">
                            {navLinks.map((link) => (
                                <motion.li key={link.href} variants={staggerItem}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => onNavClick(e, link.href)}
                                        className="block py-3 text-xl font-medium text-primary-700 hover:text-accent-500 transition-colors border-b border-cream-100"
                                    >
                                        {link.label}
                                    </a>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.nav>

                    {/* Contact Info */}
                    {data && (
                        <div className="p-6 bg-cream-50 border-t border-cream-200">
                            <h3 className="font-serif font-bold text-lg text-primary-700 mb-4">
                                Contact Us
                            </h3>

                            <div className="space-y-3">
                                {data.businessInfo.phone && (
                                    <a
                                        href={`tel:${formatPhoneLink(data.businessInfo.phone)}`}
                                        className="flex items-center gap-3 text-primary-600 hover:text-accent-500 transition-colors"
                                    >
                                        <Phone className="w-5 h-5" />
                                        <span>{data.businessInfo.phone}</span>
                                    </a>
                                )}

                                {data.businessInfo.email && (
                                    <a
                                        href={`mailto:${data.businessInfo.email}`}
                                        className="flex items-center gap-3 text-primary-600 hover:text-accent-500 transition-colors"
                                    >
                                        <Mail className="w-5 h-5" />
                                        <span className="truncate">{data.businessInfo.email}</span>
                                    </a>
                                )}

                                {data.businessInfo.address && (
                                    <div className="flex items-start gap-3 text-primary-600">
                                        <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                        <span>{formatAddress(data.businessInfo.address)}</span>
                                    </div>
                                )}
                            </div>

                            {/* Book Now CTA */}
                            <Button
                                variant="accent"
                                size="lg"
                                className="w-full mt-6"
                                onClick={() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                    onClose();
                                }}
                            >
                                Book Appointment
                            </Button>
                        </div>
                    )}
                </div>
            </motion.div>
        </>
    );
}
