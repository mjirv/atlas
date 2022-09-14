import Head from 'next/head'
import Image from 'next/image'

import styles from '@/styles/Home.module.css'
import { Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'

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
        <Heading as="h1" size="3xl" className={styles.title}>
          Welcome to <a href="https://github.com/mjirv/atlas">Atlas</a>
        </Heading>

        <Text className={styles.description}>
          Get started by clicking on one of the blocks below or{` `}
          <a href="/reports">browse existing reports</a>
        </Text>

        <div className={styles.grid}>
          <Link href="/reports/funnel">
            <a className={styles.card}>
              <Heading as="h2" size="xl">
                Funnels &rarr;
              </Heading>
              <Text>
                Analyze funnels and what leads users to convert or drop off.
              </Text>
            </a>
          </Link>

          <a href="/reports/new?type=flow" className={styles.card}>
            <Heading as="h2" size="xl">
              Flows &rarr;
            </Heading>
            <Text>
              Discover common patterns and workflows within your product usage!
            </Text>
          </a>

          <a href="/reports/new?type=retention" className={styles.card}>
            <Heading as="h2" size="xl">
              Retention &rarr;
            </Heading>
            <Text>
              Analyze why your users stick around and when they leave.
            </Text>
          </a>

          <a href="/reports/new?type=sql" className={styles.card}>
            <Heading as="h2" size="xl">
              SQL Runner &rarr;
            </Heading>
            <Text>
              Write custom quries using SQL, dbt refs and macros, and Jinja.
            </Text>
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
  )
}
