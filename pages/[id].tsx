import Head from "../components/Head";

import Link from "next/link";
import Image from "next/image";

import GebaeudeCanvasFullscreen from "../components/GebaeudeCanvasFullscreen";
import styles from "../styles/gebaeude.module.css";

import gebaeudeData from "../data/gebaeudeData";

export default function Gebaeude(props: GebaeudeProps) {
  return (
    <div>
      <Head title={`${props.info.name.toUpperCase()} | BERLIN BRUTALISM`} />

      <main className={styles.wrapper}>
        <Link
          className={styles.backButton}
          href={`./#${props.id}`}
          title="Zurück zur Hauptseite"
        >
          <svg
            width="23"
            height="22"
            viewBox="0 0 23 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 1L1.5 11M1.5 11L11.5 21M1.5 11H22.5"
              stroke="var(--clr-main-dark)"
            />
          </svg>
        </Link>

        <Link
          className={styles.logo}
          href={`./#${props.id}`}
          title="Zurück zur Hauptseite"
        >
          <Image
            src="/logo.svg"
            alt="Brutalismus Berlin Logo"
            width={40}
            height={45}
          />
        </Link>

        <GebaeudeCanvasFullscreen {...props} />
      </main>
    </div>
  );
}

export async function getStaticPaths() {
  const ids = gebaeudeData.map((gebaeude) => gebaeude.id);

  const paths = ids.map((id) => ({
    params: { id: id.toString() }
  }));
  return {
    paths,
    fallback: false
  };
}

export const getStaticProps = async (context: any) => {
  const data = gebaeudeData.find(
    (gebaeude) => gebaeude.id == context.params.id
  );
  return {
    props: data
  };
};

type GebaeudeProps = CanvasProps;
