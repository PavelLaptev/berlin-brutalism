import HeadComponent from "next/head";

interface Props {
  title?: string;
  ogImageName?: string;
  ogTitle?: string;
  ogDescription?: string;
}

const Head: React.FC<Props> = ({
  title = "BERLIN BRUTALISM",
  ogImageName = "main",
  ogTitle = "BERLIN BRUTALISM",
  ogDescription = "3D models of the most significant brutalist buildings in Berlin"
}) => {
  return (
    <>
      <HeadComponent>
        <title>{title}</title>
        <meta
          name="BERLIN BRUTALISM"
          content="3D models of the most significant brutalist buildings in Berlin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={ogDescription} />
        <meta
          property="og:image"
          content={`https://raw.githubusercontent.com/PavelLaptev/berlin-brutalism/main/public/og/og-${ogImageName}.jpeg`}
        />

        <link rel="apple-touch-icon" sizes="180x180" href="./fav/fav-180.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="./fav/fav-32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="./fav/fav-16.png"
        />
        <link rel="icon" href="./fav/favicon.ico" />
      </HeadComponent>
    </>
  );
};

export default Head;
