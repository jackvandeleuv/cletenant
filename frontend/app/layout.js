import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google'

export const metadata = {
  metadataBase: new URL('https://www.cletenant.com'),
  title: {
    default: 'CleTenant | Search',
  },
  description: 'Search public government data about any property in the city of Cleveland.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'CleTenant',
    title: 'CleTenant',
    description: 'Search public government data about any property in the city of Cleveland.',
    url: '/',
    images: ['/opengraph-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CleTenant',
    description: 'Search public government data about any property in the city of Cleveland.',
    images: ['/opengraph-image.png'],
  },
}

export default function RootLayout({ children }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang="en">
      <body>
        {children}
        {gaId ? <GoogleAnalytics gaId={gaId} /> : null}
      </body>
    </html>
  );
}
