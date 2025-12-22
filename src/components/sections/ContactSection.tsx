'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { toast, Toaster } from 'sonner';
import { useBusinessData } from '@/hooks';
import { Container } from '@/components/ui/Container';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Card } from '@/components/ui/Card';
import { formatPhoneLink, formatAddress } from '@/lib/utils';

// Form validation schema
const contactSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Please enter a valid email'),
    phone: z.string().min(10, 'Please enter a valid phone number'),
    petName: z.string().min(1, 'Please enter your pet\'s name'),
    petType: z.string().min(1, 'Please select a pet type'),
    service: z.string().min(1, 'Please select a service'),
    preferredDate: z.string().optional(),
    message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

/**
 * Contact form component
 */
function ContactForm({ services }: { services: Array<{ id: string; name: string }> }) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        console.log('Form submitted:', data);

        toast.success('Message sent successfully!', {
            description: 'We\'ll get back to you within 24 hours.',
            icon: <CheckCircle className="w-5 h-5 text-sage-500" />,
        });

        reset();
    };

    const petTypeOptions = [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
    ];

    const serviceOptions = services.map((s) => ({
        value: s.id,
        label: s.name,
    }));

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
                <Input
                    label="Your Name"
                    {...register('name')}
                    error={errors.name?.message}
                />
                <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    error={errors.email?.message}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <Input
                    label="Phone"
                    type="tel"
                    {...register('phone')}
                    error={errors.phone?.message}
                />
                <Input
                    label="Pet's Name"
                    {...register('petName')}
                    error={errors.petName?.message}
                />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
                <Select
                    label="Pet Type"
                    options={petTypeOptions}
                    {...register('petType')}
                    error={errors.petType?.message}
                />
                <Select
                    label="Service"
                    options={serviceOptions}
                    {...register('service')}
                    error={errors.service?.message}
                />
            </div>

            <Input
                label="Preferred Date (Optional)"
                type="date"
                {...register('preferredDate')}
                error={errors.preferredDate?.message}
            />

            <Textarea
                label="Message (Optional)"
                rows={4}
                {...register('message')}
                error={errors.message?.message}
            />

            <Button
                type="submit"
                variant="accent"
                size="lg"
                isLoading={isSubmitting}
                rightIcon={<Send className="w-5 h-5" />}
                className="w-full sm:w-auto"
            >
                Send Message
            </Button>
        </form>
    );
}

/**
 * Business info card
 */
function ContactInfo({ data }: { data: NonNullable<ReturnType<typeof useBusinessData>['data']> }) {
    const { businessInfo } = data;

    const hoursArray = [
        { day: 'Monday', hours: businessInfo.hours.monday },
        { day: 'Tuesday', hours: businessInfo.hours.tuesday },
        { day: 'Wednesday', hours: businessInfo.hours.wednesday },
        { day: 'Thursday', hours: businessInfo.hours.thursday },
        { day: 'Friday', hours: businessInfo.hours.friday },
        { day: 'Saturday', hours: businessInfo.hours.saturday },
        { day: 'Sunday', hours: businessInfo.hours.sunday },
    ];

    return (
        <Card variant="elevated" className="h-full">
            <h3 className="text-xl font-serif font-bold text-primary-700 mb-6">
                Contact Information
            </h3>

            <div className="space-y-5">
                {/* Phone */}
                <a
                    href={`tel:${formatPhoneLink(businessInfo.phone)}`}
                    className="flex items-center gap-4 text-primary-600 hover:text-accent-500 transition-colors"
                >
                    <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                        <Phone className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                        <p className="text-sm text-primary-400">Phone</p>
                        <p className="font-medium">{businessInfo.phone}</p>
                    </div>
                </a>

                {/* Email */}
                <a
                    href={`mailto:${businessInfo.email}`}
                    className="flex items-center gap-4 text-primary-600 hover:text-accent-500 transition-colors"
                >
                    <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                        <p className="text-sm text-primary-400">Email</p>
                        <p className="font-medium break-all">{businessInfo.email}</p>
                    </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 text-primary-600">
                    <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-accent-600" />
                    </div>
                    <div>
                        <p className="text-sm text-primary-400">Address</p>
                        <p className="font-medium">{formatAddress(businessInfo.address)}</p>
                    </div>
                </div>

                {/* Hours */}
                <div>
                    <div className="flex items-center gap-4 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center flex-shrink-0">
                            <Clock className="w-5 h-5 text-accent-600" />
                        </div>
                        <div>
                            <p className="text-sm text-primary-400">Business Hours</p>
                        </div>
                    </div>
                    <div className="ml-16 space-y-1">
                        {hoursArray.map(({ day, hours }) => (
                            <div key={day} className="flex justify-between text-sm">
                                <span className="text-primary-500">{day}</span>
                                <span className={hours === 'Closed' ? 'text-red-500' : 'text-primary-700 font-medium'}>
                                    {hours}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}

/**
 * Contact section with form and business info
 */
export function ContactSection() {
    const { data, loading } = useBusinessData();
    const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

    if (loading || !data) {
        return null;
    }

    return (
        <section id="contact" className="py-20 bg-cream-50" ref={ref}>
            <Container>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <Badge variant="accent" className="mb-4">Contact</Badge>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary-700 mb-4">
                        Book an Appointment
                    </h2>
                    <p className="text-lg text-primary-500 max-w-2xl mx-auto">
                        Ready to pamper your pet? Get in touch with us to schedule their next grooming session!
                    </p>
                </motion.div>

                {/* Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <Card variant="elevated">
                            <h3 className="text-xl font-serif font-bold text-primary-700 mb-6">
                                Send us a Message
                            </h3>
                            <ContactForm services={data.services} />
                        </Card>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <ContactInfo data={data} />
                    </motion.div>
                </div>

                {/* Map */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-12"
                >
                    <div className="rounded-2xl overflow-hidden shadow-lg h-80 sm:h-96">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d105781.07455721546!2d-118.42631208359374!3d34.05262810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c7f2af55e307%3A0xb0558079d8c08ced!2sSasha%20pet%20salon!5e0!3m2!1sen!2sng!4v1766392094801!5m2!1sen!2sng"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Sasha Pet Salon Location"
                        />
                    </div>
                </motion.div>
            </Container>

            {/* Toast Container */}
            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'white',
                        border: '1px solid #f0ebe0',
                    },
                }}
            />
        </section>
    );
}
