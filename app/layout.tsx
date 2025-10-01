import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project AI - Your Daily Guide to AI & Agentic AI',
  description: 'Discover insights, tutorials, and the latest in AI technology. Project AI is your comprehensive resource for Agentic AI, artificial intelligence trends, and cutting-edge AI solutions.',
  keywords: ['Agentic AI', 'AI blog', 'ProjectAI.Space', 'artificial intelligence', 'machine learning', 'AI tutorials', 'AI news'],
  authors: [{ name: 'Project AI' }],
  openGraph: {
    title: 'Project AI - Your Daily Guide to AI & Agentic AI',
    description: 'Discover insights, tutorials, and the latest in AI technology.',
    url: 'https://projectai.space',
    siteName: 'Project AI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project AI - Your Daily Guide to AI & Agentic AI',
    description: 'Discover insights, tutorials, and the latest in AI technology.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxxxxxx"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
