import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import Script from "next/script";
import { useRouter } from "next/router";

declare global {
  interface Window {
    goatcounter?: { count: (vars?: { path?: string }) => void };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // GoatCounter counts the first page load itself; client-side navigations
  // (e.g. opening a building in fullscreen) have to be counted by hand
  React.useEffect(() => {
    const handleRouteChange = () => {
      window.goatcounter?.count({ path: location.pathname });
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  return (
    <>
      {/* Privacy-friendly page views, no cookies. Skips localhost on its own. */}
      <Script
        data-goatcounter="https://berlin-brutalism.goatcounter.com/count"
        src="https://gc.zgo.at/count.js"
        strategy="afterInteractive"
      />
      <Component {...pageProps} />
    </>
  );
}
