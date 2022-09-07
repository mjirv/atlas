import Head from 'next/head';
import Image from 'next/image';

import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>TypeScript starter for Next.js</title>
        <meta
          name="description"
          content="TypeScript starter for Next.js that includes all you need to build amazing apps"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/mjirv/atlas">Atlas</a>
        </h1>

        <p className={styles.description}>
          Get started by clicking on one of the blocks below or{` `}
          <a href="/reports">browse existing reports</a>
        </p>

        <div className={styles.grid}>
          <a href="/reports/new?type=funnel" className={styles.card}>
            <h2>Funnels &rarr;</h2>
            <p>Analyze funnels and what leads users to convert or drop off.</p>
          </a>

          <a href="/reports/new?type=flow" className={styles.card}>
            <h2>Flows &rarr;</h2>
            <p>
              Discover common patterns and workflows within your product usage!
            </p>
          </a>

          <a href="/reports/new?type=retention" className={styles.card}>
            <h2>Retention &rarr;</h2>
            <p>Analyze why your users stick around and when they leave.</p>
          </a>

          <a href="/reports/new?type=sql" className={styles.card}>
            <h2>SQL Runner &rarr;</h2>
            <p>
              Write custom quries using SQL, dbt refs and macros, and Jinja.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=typescript-nextjs-starter"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{` `}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
