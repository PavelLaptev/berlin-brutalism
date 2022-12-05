import Head from "next/head";

import styles from "../styles/app.module.css";

import Header from "../components/Header";
import Footer from "../components/Footer";
import GebaudeCard from "../components/GebaudeCard";

const gebauedeData = [
  {
    id: "bierpinsel",
    name: "Bierpinsel",
    architekt: [
      {
        name: "Ralf Schüler & Ursulina Schüler-Witte",
        link: "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte"
      }
    ],
    bauzeit: "1972—1976",
    karte: "https://goo.gl/maps/SmF6s46hufEq6TfHA",
    wiki: "https://www.abandonedberlin.com/bierpinsel",
    camera: {
      position: [130, 100, 100],
      zoom: 0.75,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      scale: 1,
      position: [0, -9.2, -1],
      rotation: [0, 0, 0]
    },
    light: {
      position: [15, 25, 30],
      angle: 0.3,
      intensity: 1
    }
  },
  {
    id: "maeusebunker",
    name: "Mäusebunker",
    architekt: [
      {
        name: "Gerd Hänska",
        link: "https://de.wikipedia.org/wiki/Gerd_H%C3%A4nska"
      },
      {
        name: "Kurt Schmersow",
        link: "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte"
      }
    ],
    bauzeit: "1971—1981",
    karte: "https://goo.gl/maps/eAWm1rtDrBULFQe57",
    wiki: "https://www.abandonedberlin.com/mouse-bunker/",
    camera: {
      position: [130, 80, 100],
      zoom: 0.8,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      scale: 0.38,
      position: [0, -1, 1.5],
      rotation: [0, -90, 0]
    },
    light: {
      position: [13, 13, 15],
      angle: 0.8,
      intensity: 2.1
    }
  },
  {
    id: "rosaroehre",
    name: "Rosa Röhre",
    architekt: [
      {
        name: "Ludwig Leo",
        link: "https://de.wikipedia.org/wiki/Gerd_H%C3%A4nska"
      },
      {
        name: "Christian de Boes",
        link: ""
      }
    ],
    bauzeit: "1968—1974",
    karte: "https://goo.gl/maps/zrxRS7VwsBHxxQLe7",
    wiki: "https://de.wikipedia.org/wiki/Rosa_R%C3%B6hre",
    camera: {
      position: [140, 60, 100],
      zoom: 0.78,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      scale: 0.4,
      position: [1.8, -3.9, -3.5],
      rotation: [0, 90, 0]
    },
    light: {
      position: [13, 13, 15],
      angle: 0.8,
      intensity: 1.3
    }
  },
  {
    id: "trudelturm",
    name: "Trudelturm",
    architekt: [
      {
        name: "Hermann Brenner & Werner Deutschmann",
        link: ""
      }
    ],
    bauzeit: "1934—1936",
    karte: "https://goo.gl/maps/pG92dCi76gmnbxZT6",
    wiki: "https://en.wikipedia.org/wiki/Trudelturm",
    camera: {
      position: [100, 120, 100],
      zoom: 0.95,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      scale: 1,
      position: [0, -6, 0],
      rotation: [0, -15, 0]
    },
    light: {
      position: [15, 35, 15],
      angle: 0.8,
      intensity: 1.3
    }
  },
  {
    id: "kugellabore",
    name: "Isothermische Kugellabore",
    architekt: [
      {
        name: "Horst Welser",
        link: "https://de.wikipedia.org/wiki/Horst_Welser"
      }
    ],
    bauzeit: "1959—1961",
    karte: "https://goo.gl/maps/pG92dCi76gmnbxZT6",
    wiki: "https://en.wikipedia.org/wiki/Trudelturm",
    camera: {
      position: [100, 50, 120],
      zoom: 1,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      scale: 0.42,
      position: [-0, -3.0, 0],
      rotation: [0, 100, 0]
    },
    light: {
      position: [15, 25, 15],
      angle: 0.8,
      intensity: 0.9
    }
  }
];

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
          {gebauedeData.map((gebauede) => (
            <GebaudeCard
              key={gebauede.id}
              id={gebauede.id as gebaudeNames}
              name={gebauede.name}
              architekt={gebauede.architekt}
              bauzeit={gebauede.bauzeit}
              karte={gebauede.karte}
              wiki={gebauede.wiki}
              camera={gebauede.camera}
              model={gebauede.model as any}
              light={gebauede.light as any}
            />
          ))}
        </section>

        <Footer />
      </main>
    </div>
  );
}
