import Head from "next/head";

import styles from "../styles/app.module.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GebaeudeCard from "../components/GebaeudeCard";

import gebaeudeData from "../data/gebaeudeData";

export default function Home() {
  return (
    <div>
      <Head>
        <title>BERLIN BRUTALISM</title>
        <meta
          name="description"
          content="The most significant brutalist buildings in Berlin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <Header />

        <section className={styles.cards}>
          {gebaeudeData.map((gebaeude) => (
            <GebaeudeCard
              key={gebaeude.id}
              id={gebaeude.id}
              info={gebaeude.info}
              camera={gebaeude.camera}
              model={gebaeude.model}
              light={gebaeude.light}
            />
          ))}
        </section>

        <Footer />
      </main>
    </div>
  );
}
