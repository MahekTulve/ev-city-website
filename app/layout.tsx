import localFont from 'next/font/local';
import { Bodoni_Moda, Cormorant_Garamond, Jura, Montez } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const amsterdamFont = localFont({
  src: '../public/fonts/AmsterdamOne-eZ12l.ttf',
  variable: '--font-amsterdam',
  display: 'swap',
});

const amsterdamFontFour = localFont({
  src: '../public/fonts/AmsterdamFourSlantTtf-4B4yl.ttf',
  variable: '--font-amsterdamFour',
  display: 'swap',
});
const theseasonsReg = localFont({
  src: '../public/fonts/Fontspring-DEMO-theseasons-reg.otf',
  variable: '--font-theSeasons',
  display: 'swap',
});

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

const jurafont = Jura({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal'],
  variable: '--font-jura',
});

// FIXED: Bodoni_Moda configuration
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
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
          className={`${amsterdamFont.variable} ${cormorant.variable} ${libreBaskerville.variable} ${jurafont.variable} ${amsterdamFontFour.variable} ${bodoni.variable} ${theseasonsReg.variable}`}
          
          style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}
        >
          <main>{children}</main>
          <Footer />
        </body>
      </SmoothScroll>
    </html>
  );
}