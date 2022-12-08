import Head from "next/head";

import GebaeudeCanvasFullscreen from "../components/GebaeudeCanvasFullscreen";
import styles from "../styles/gebaude.module.css";

const gebaude = [
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
  } as CanvasProps
];

export default function Gebaude(props: GebaudeProps) {
  console.log(props);

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
        <GebaeudeCanvasFullscreen {...props.gebaudeData} />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const ids = gebaude.map((gebaude) => gebaude.id);

  const paths = ids.map((id) => ({
    params: { id: id.toString() }
  }));
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = async (context: any) => {
  const gebaudeData = gebaude.find(
    (gebaude) => gebaude.id == context.params.id
  );
  return {
    props: {
      gebaudeData
    }
  };
};

type GebaudeProps = {
  gebaudeData: CanvasProps;
};
