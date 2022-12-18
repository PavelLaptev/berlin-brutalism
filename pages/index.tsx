import Head from "../components/Head";

import styles from "../styles/app.module.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GebaeudeCard from "../components/GebaeudeCard";

import gebaeudeData from "../data/gebaeudeData";

export default function Home() {
  return (
    <div>
      <Head />

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
