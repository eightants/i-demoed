import Head from "next/head";
import styles from "./layout.module.css";

export const siteTitle = "Next.js Sample Website";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Showcase your role in the hackathon community"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header className="flex items-center flex-row justify-center">
        <img className="h-10" src="/images/hexagon.svg"/>
        <h1 className="mx-4 text-4xl">I Demoed</h1>
      </header>
      <main>{children}</main>
    </div>
  );
}
