import './globals.css';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

export const metadata = {
  title: 'EV City Website',
  description: 'Welcome to EV City',
  icons: {
    icon: '/favicon.png', // 'icon' ko 'icons' object ke andar hona chahiye
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
          style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
          <main>
            {children}
          </main>
          <Footer />
        </body>
      </SmoothScroll>

    </html>
  );
}