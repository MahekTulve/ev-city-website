import Navbar from '@/components/Navbar';
import './globals.css';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';

export const metadata = {
  title: 'EV City Website',
  description: 'Welcome to EV City',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}>
        <Navbar />
        <main>
          {children}
        </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}