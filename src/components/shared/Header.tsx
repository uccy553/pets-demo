'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Phone } from 'lucide-react';
import { useBusinessData, useScrolled } from '@/hooks';
import { cn, formatPhoneLink } from '@/lib/utils';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { MobileMenu } from './MobileMenu';

const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
];

/**
 * Main navigation header with transparent-to-solid scroll effect
 */
export function Header() {
    const { data } = useBusinessData();
    const isScrolled = useScrolled(50);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                    isScrolled
                        ? 'bg-white/95 backdrop-blur-lg shadow-md py-2'
                        : 'bg-transparent py-4'
                )}
            >
                <Container>
                    <nav className="flex items-center justify-between">
                        {/* Logo */}
                        <Link
                            href="/"
                            className="flex items-center gap-2"
                        >
                            <Image
                                src="/logo.svg"
                                alt={data?.businessInfo.name || 'Pet Grooming'}
                                width={48}
                                height={48}
                                className="w-10 h-10 md:w-12 md:h-12"
                            />
                            <span
                                className={cn(
                                    'font-serif font-bold text-lg md:text-xl transition-colors duration-300 hidden sm:inline',
                                    isScrolled ? 'text-primary-700' : 'text-white'
                                )}
                            >
                                {data?.businessInfo.name || 'Pet Grooming'}
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                    className={cn(
                                        'font-medium transition-colors duration-300 hover:text-accent-500',
                                        isScrolled ? 'text-primary-600' : 'text-white/90 hover:text-white'
                                    )}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* Right side - Phone & CTA */}
                        <div className="flex items-center gap-4">
                            {/* Phone number - hidden on mobile */}
                            {data?.businessInfo.phone && (
                                <a
                                    href={`tel:${formatPhoneLink(data.businessInfo.phone)}`}
                                    className={cn(
                                        'hidden md:flex items-center gap-2 font-medium transition-colors duration-300',
                                        isScrolled ? 'text-primary-600' : 'text-white'
                                    )}
                                >
                                    <Phone className="w-4 h-4" />
                                    <span className="whitespace-nowrap">{data.businessInfo.phone}</span>
                                </a>
                            )}

                            {/* Book Now CTA */}
                            <Button
                                variant={isScrolled ? 'accent' : 'primary'}
                                size="md"
                                className="hidden sm:flex"
                                onClick={() => {
                                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Book Now
                            </Button>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className={cn(
                                    'lg:hidden p-2 rounded-lg transition-colors duration-300',
                                    isScrolled
                                        ? 'text-primary-600 hover:bg-cream-100'
                                        : 'text-white hover:bg-white/10'
                                )}
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </nav>
                </Container>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileMenu
                        navLinks={navLinks}
                        onClose={() => setIsMobileMenuOpen(false)}
                        onNavClick={handleNavClick}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
