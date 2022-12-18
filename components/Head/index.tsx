import HeadComponent from "next/head";

interface Props {
  title?: string;
}

const Head: React.FC<Props> = (props) => {
  return (
    <>
      <HeadComponent>
        <title>{props.title}</title>
        <meta
          name="BERLIN BRUTALISM"
          content="3D models of the most significant brutalist buildings in Berlin"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

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

Head.defaultProps = {
  title: "BERLIN BRUTALISM"
};

export default Head;
