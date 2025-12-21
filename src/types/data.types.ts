// =============================================================================
// Type Definitions for Pet Grooming Website Data
// All content is loaded dynamically from data.json
// =============================================================================

/**
 * Root data structure for the entire website
 */
export interface BusinessData {
    businessInfo: BusinessInfo;
    hero: Hero;
    trustBar: TrustBarItem[];
    services: Service[];
    whyChooseUs: WhyChooseUsItem[];
    testimonials: Testimonial[];
    gallery: GalleryItem[];
    faqs: FAQ[];
    additionalInfo: AdditionalInfo;
    seo: SEO;
}

/**
 * Core business information
 */
export interface BusinessInfo {
    name: string;
    tagline: string;
    description: string;
    established: string;
    phone: string;
    email: string;
    address: Address;
    social: Social;
    hours: Hours;
}

export interface Address {
    street: string;
    city: string;
    state: string;
    stateAbbr: string;
    zip: string;
    country: string;
}

export interface Social {
    facebook: string;
    instagram: string;
    twitter: string;
}

export interface Hours {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
}

/**
 * Hero section data
 */
export interface Hero {
    mainHeading: string;
    subHeading: string;
    description: string;
    ctaPrimary: CTA;
    ctaSecondary: CTA;
    carouselImages: CarouselImage[];
}

export interface CTA {
    text: string;
    link: string;
}

export interface CarouselImage {
    url: string;
    alt: string;
}

/**
 * Trust bar statistics
 */
export interface TrustBarItem {
    icon: string;
    value: string;
    label: string;
}

/**
 * Service offerings
 */
export interface Service {
    id: string;
    name: string;
    icon: string;
    shortDescription: string;
    fullDescription: string;
    priceFrom: number;
    duration: string;
    includes: string[];
    category: ServiceCategory;
}

export type ServiceCategory = 'full-service' | 'basic' | 'specialty' | 'addon';

/**
 * Why Choose Us section items
 */
export interface WhyChooseUsItem {
    title: string;
    description: string;
    icon: string;
    imageUrl: string;
}

/**
 * Customer testimonials
 */
export interface Testimonial {
    id: number;
    name: string;
    petName: string;
    petType: string;
    rating: number;
    text: string;
    date: string;
    imageUrl: string;
}

/**
 * Gallery/portfolio items
 */
export interface GalleryItem {
    id: number;
    petName: string;
    petType: 'dog' | 'cat';
    breed: string;
    service: string;
    beforeImage: string;
    afterImage: string;
    featured: boolean;
}

/**
 * Frequently Asked Questions
 */
export interface FAQ {
    question: string;
    answer: string;
}

/**
 * Additional business information
 */
export interface AdditionalInfo {
    parking: string;
    accessibility: string;
    paymentMethods: string[];
    languages: string[];
    petTypes: string[];
    specializations: string[];
}

/**
 * SEO metadata
 */
export interface SEO {
    title: string;
    description: string;
    keywords: string[];
}

/**
 * Icon name type for type-safe icon usage
 */
export type IconName =
    | 'pawPrint'
    | 'award'
    | 'shield'
    | 'star'
    | 'scissors'
    | 'bath'
    | 'heart'
    | 'paw'
    | 'smile'
    | 'wind'
    | 'bug'
    | 'clock'
    | 'certificate'
    | 'sparkles'
    | 'clipboard'
    | 'phone'
    | 'mail'
    | 'mapPin'
    | 'facebook'
    | 'instagram'
    | 'twitter'
    | 'chevronDown'
    | 'chevronUp'
    | 'menu'
    | 'x'
    | 'arrowUp'
    | 'calendar'
    | 'user'
    | 'dog'
    | 'cat';

/**
 * Contact form data
 */
export interface ContactFormData {
    name: string;
    email: string;
    phone: string;
    petName: string;
    petType: string;
    service: string;
    preferredDate: string;
    message: string;
}
