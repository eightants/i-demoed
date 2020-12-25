import Head from "next/head";
import { DOMAIN, SITE_TITLE } from "../functions/constants";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="description"
          content="Showcase your participation in the hackathon community. "
        />
        <meta property="og:image" content="/images/idemoed-badges.png" />
        <meta name="og:title" content={SITE_TITLE} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:url" content={DOMAIN} />
        <meta
          property="og:description"
          content="Showcase your participation in the hackathon community. "
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-JM3JPFQJ27"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
  
    gtag('config', 'G-JM3JPFQJ27');
   `,
          }}
        />
      </Head>
      <main>{children}</main>
    </div>
  );
}
