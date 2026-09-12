import localFont from 'next/font/local';
import { Cormorant_Garamond, Libre_Baskerville, Montez } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const amsterdamFont = localFont({
  src: '../public/fonts/AmsterdamOne-eZ12l.ttf',
  variable: '--font-amsterdam',
  display: 'swap',
});

// variable create karein
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'], 
  variable: '--font-cormorant',
});
const libreBaskerville = Montez({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal'],
  variable: '--Montez',
});

export const metadata = {
  title: 'EV City Website',
  description: 'Welcome to EV City',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <SmoothScroll>
        <body
          suppressHydrationWarning={true}
          /* Dono font variables pass kar diye */
          className={`${amsterdamFont.variable} ${cormorant.variable} ${libreBaskerville.variable}`}
          style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}
        >
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </SmoothScroll>
    </html>
  );
}