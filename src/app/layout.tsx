import type { Metadata, Viewport } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Premium Pet Grooming',
  description: 'Expert pet grooming services with personalized care. Book your appointment today!',
  keywords: ['pet grooming', 'dog grooming', 'cat grooming', 'pet salon', 'professional pet groomer'],
  authors: [{ name: 'Pet Grooming Template' }],
  openGraph: {
    type: 'website',
    title: 'Premium Pet Grooming',
    description: 'Expert pet grooming services with personalized care.',
    siteName: 'Pet Grooming',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Premium Pet Grooming',
    description: 'Expert pet grooming services with personalized care.',
  },
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data - will be dynamically populated */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              '@id': '#business',
              name: 'Pet Grooming Salon',
              description: 'Premium pet grooming services',
              image: '/images/og-image.jpg',
              priceRange: '$$',
              servesCuisine: 'Pet Services',
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider>
          {/* Skip Link for Accessibility */}
          <a
            href="#main-content"
            className="skip-link"
          >
            Skip to main content
          </a>

          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
