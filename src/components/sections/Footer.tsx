'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin, Heart } from 'lucide-react';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { formatPhoneLink, formatAddress } from '@/lib/utils';
import { cn } from '@/lib/utils';

const quickLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Contact', href: '#contact' },
];

const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter,
};

/**
 * Footer component with 4-column layout
 */
export function Footer() {
    const { data, loading } = useBusinessData();
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
    const currentYear = new Date().getFullYear();

    if (loading || !data) {
        return null;
    }

    const { businessInfo, services } = data;

    // Get active social links
    const socialLinks = Object.entries(businessInfo.social).filter(([_, url]) => url);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-primary-700 text-cream-100" ref={ref}>
            <Container>
                {/* Main Footer Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-10"
                >
                    {/* Column 1: Logo & About */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-3 mb-4">
                            <Image
                                src="/logo.svg"
                                alt={businessInfo.name}
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <h3 className="text-2xl font-serif font-bold text-white">
                                {businessInfo.name}
                            </h3>
                        </Link>
                        <p className="text-cream-200/80 mb-6">{businessInfo.tagline}</p>

                        {/* Social Icons */}
                        {socialLinks.length > 0 && (
                            <div className="flex gap-3">
                                {socialLinks.map(([platform, url]) => {
                                    const IconComponent = socialIcons[platform];
                                    if (!IconComponent) return null;

                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 rounded-full bg-cream-100/10 hover:bg-accent-500 flex items-center justify-center transition-colors duration-300"
                                            aria-label={platform}
                                        >
                                            <IconComponent className="w-5 h-5" />
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        onClick={(e) => handleNavClick(e, link.href)}
                                        className="text-cream-200/80 hover:text-accent-400 transition-colors"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Services */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Our Services</h4>
                        <ul className="space-y-3">
                            {services.slice(0, 5).map((service) => (
                                <li key={service.id}>
                                    <a
                                        href="#services"
                                        onClick={(e) => handleNavClick(e, '#services')}
                                        className="text-cream-200/80 hover:text-accent-400 transition-colors"
                                    >
                                        {service.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href={`tel:${formatPhoneLink(businessInfo.phone)}`}
                                    className="flex items-center gap-3 text-cream-200/80 hover:text-accent-400 transition-colors"
                                >
                                    <Phone className="w-5 h-5 flex-shrink-0" />
                                    <span>{businessInfo.phone}</span>
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${businessInfo.email}`}
                                    className="flex items-center gap-3 text-cream-200/80 hover:text-accent-400 transition-colors"
                                >
                                    <Mail className="w-5 h-5 flex-shrink-0" />
                                    <span className="break-all">{businessInfo.email}</span>
                                </a>
                            </li>
                            <li className="flex items-start gap-3 text-cream-200/80">
                                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>{formatAddress(businessInfo.address)}</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </Container>

            {/* Bottom Bar */}
            <div className="border-t border-cream-100/10">
                <Container>
                    <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-cream-200/60">
                        <p className="flex items-center gap-1">
                            © {currentYear} {businessInfo.name}. Made with{' '}
                            <Heart className="w-4 h-4 text-accent-500 fill-accent-500" /> for pets
                        </p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-cream-100 transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-cream-100 transition-colors">Terms of Service</a>
                        </div>
                    </div>
                </Container>
            </div>
        </footer>
    );
}
