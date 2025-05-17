import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import ProgressProvider from '@/components/layouts/providers/ProgressProvider';
import type { ChildrenType } from '@/types/common';
import '@/app/globals.css';
import Providers from '@/components/Providers';
import { ToastContainer } from 'react-toastify';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const title = 'IdeaX';

const description = 'IdeaX | Giải pháp ý tưởng cho bạn';

export const metadata: Metadata = {
  metadataBase: new URL((process.env.NEXT_PUBLIC_APP_URL as string) || 'https://ideax.vn'),
  title: {
    template: `%s | ${title}`,
    default: title,
  },
  description: description,
  robots: {
    index: true,
    follow: true,
    nocache: true,
    'max-snippet': -1,
    'max-image-preview': 'large',
    'max-video-preview': -1,
    noimageindex: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  keywords: ['ideax', 'ideax.vn'],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/android-chrome-192x192.png',
    apple: '/apple-touch-icon.png',
  },
  applicationName: 'IdeaX',
  authors: [{ name: 'ideax.vn' }],

  manifest: '/manifest.json',
};

function RootLayout({ children }: ChildrenType) {
  return (
    <html id="__next" lang="vi" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ProgressProvider>
          <Providers>{children}</Providers>
        </ProgressProvider>
        <ToastContainer />
      </body>
    </html>
  );
}

export default RootLayout;
