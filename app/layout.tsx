import Script from 'next/script';
import localFont from 'next/font/local';
import { Cormorant_Garamond, Jura, Montez } from 'next/font/google';
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
          className={`${amsterdamFont.variable} ${cormorant.variable} ${libreBaskerville.variable} ${jurafont.variable} ${amsterdamFontFour.variable}  ${theseasonsReg.variable}`}

          style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0 }}
        >
          <main>{children}</main>
          <Footer />

          <Script id="om-cookie-reset" strategy="beforeInteractive">
            {`
            (function (campaignId) {
              var cookieNames = [
                "om-" + campaignId,
                "omSeen-" + campaignId,
                "om-success-" + campaignId,
                "omSuccess-" + campaignId,
                "om-" + campaignId + "-closed",
                "omSlideClosed-" + campaignId,
                "om-global-cookie",
                "omGlobalSuccessCookie",
                "om-interaction-cookie",
                "omGlobalInteractionCookie",
                "om-success-cookie",
                "omSuccessCookie",
                "_omappvp",
                "_omappvs"
              ];

              cookieNames.forEach(function (name) {
                document.cookie =
                  name +
                  "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";

                document.cookie =
                  name +
                  "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=." +
                  location.hostname +
                  "; SameSite=Lax";
              });

              ["localStorage", "sessionStorage"].forEach(function (storageName) {
                try {
                  var storage = window[storageName];

                  [
                    "omFoldersSeen",
                    "omFoldersOptin",
                    "omFoldersClosed",
                    "omLastSeen",
                    "omSessionStart",
                    "omSessionPageviews"
                  ].forEach(function (key) {
                    storage.removeItem(key);
                  });
                } catch (error) {}
              });

            })("xdcyswsstdkp0c8viywn");
          `}
          </Script>

          {/* OptinMonster Campaign Script */}
          <Script
            id="optinmonster"
            strategy="afterInteractive"
            src="https://a.omappapi.com/app/js/api.min.js"
            data-user="342269"
            data-campaign="xdcyswsstdkp0c8viywn"
          />

        </body>
      </SmoothScroll>
    </html>
  );
}