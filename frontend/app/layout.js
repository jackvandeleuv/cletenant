import "./globals.css";
import { Analytics } from '@vercel/analytics/next';

export const metadata = {
  metadataBase: new URL('https://cletenant.com'),
  title: {
    default: 'CleTenant',
    template: '%s | CleTenant',
  },
  description: 'Find information about any property in Cleveland.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'CleTenant',
    title: 'CleTenant',
    description: 'Find information about any property in Cleveland.',
    url: '/',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Acme',
    description: 'Find information about any property in Cleveland.',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
