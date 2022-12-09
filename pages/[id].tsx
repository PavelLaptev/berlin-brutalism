import { useState } from "react";

import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import GebaeudeCanvasFullscreen from "../components/GebaeudeCanvasFullscreen";
import styles from "../styles/gebaeude.module.css";

const gebaeude = [
  {
    id: "bierpinsel",
    info: {
      name: "Bierpinsel",
      architekt: [
        {
          name: "Ralf Schüler & Ursulina Schüler-Witte",
          link: "https://de.wikipedia.org/wiki/Ralf_Sch%C3%BCler_und_Ursulina_Sch%C3%BCler-Witte"
        }
      ],
      bauzeit: "1972—1976",
      karte: "https://goo.gl/maps/SmF6s46hufEq6TfHA",
      wiki: "https://www.abandonedberlin.com/bierpinsel"
    },

    camera: {
      position: [130, 100, 100],
      zoom: 0.75,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      showZeroPlane: false,
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
    info: {
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
      wiki: "https://www.abandonedberlin.com/mouse-bunker/"
    },

    camera: {
      position: [130, 80, 100],
      zoom: 0.8,
      fov: 5,
      near: 1,
      far: 1000
    },
    model: {
      showZeroPlane: false,
      scale: 0.38,
      position: [0, -1, 1.5],
      rotation: [0, -90, 0]
    },
    light: {
      position: [13, 13, 15],
      angle: 0.8,
      intensity: 2.1
    }
  }
];

export default function Gebaeude(props: GebaeudeProps) {
  return (
    <div>
      <Head>
        <title>
          {props.gebaeudeData.info.name.toUpperCase()} | BERLIN BRUTALISM
        </title>
        <meta
          name="description"
          content="The most significant brutalist buildings in Berlin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper}>
        <Link
          className={styles.backButton}
          href={`./#${props.gebaeudeData.id}`}
          title="Zurück zur Hauptseite"
        >
          ←
        </Link>

        <Link
          className={styles.logo}
          href={`./#${props.gebaeudeData.id}`}
          title="Zurück zur Hauptseite"
        >
          <Image
            src="/logo.svg"
            alt="Brutalismus Berlin Logo"
            width={40}
            height={45}
          />
        </Link>

        <GebaeudeCanvasFullscreen {...props.gebaeudeData} />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const ids = gebaeude.map((gebaeude) => gebaeude.id);

  const paths = ids.map((id) => ({
    params: { id: id.toString() }
  }));
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = async (context: any) => {
  const gebaeudeData = gebaeude.find(
    (gebaeude) => gebaeude.id == context.params.id
  );
  return {
    props: {
      gebaeudeData
    }
  };
};

type GebaeudeProps = {
  gebaeudeData: CanvasProps;
};
