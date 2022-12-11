import React from "react";
import Link from "next/link";

import styles from "./styles.module.css";

const Footer = () => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [isEmailCopied, setIsEmailCopied] = React.useState(false);

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      setIsDarkTheme(true);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", isDarkTheme ? "dark" : "light");

    document.documentElement.setAttribute(
      "data-theme",
      isDarkTheme ? "dark" : "light"
    );
  }, [isDarkTheme]);

  const handleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setIsEmailCopied(false);
    }, 3000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isEmailCopied]);

  return (
    <footer className={styles.footer}>
      <div className={styles.gumroad}>
        <span className={styles.gumroadText}>Buy* / download models</span>
        <Link className={styles.gumroadButton} href="#">
          <svg
            width="190"
            height="27"
            viewBox="0 0 190 27"
            fill="var(--clr-main)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M112.793 0.000244141C108.898 0.000244141 105.09 3.56801 104.652 8.72306V0.425224H99.0586V25.4454H104.721V13.3346C104.721 9.9421 107.098 5.15658 112.793 5.15658V0.000244141Z" />
            <path d="M172.186 21.44V4.29822H175.466C179.839 4.29822 183.393 7.06302 183.393 12.7309C183.393 18.3987 179.839 21.44 175.466 21.44H172.186ZM166.582 25.449H176.15C182.026 25.449 189.269 21.5783 189.269 12.7309C189.269 4.02174 182.026 0.42749 176.15 0.42749H166.582V25.449Z" />
            <path d="M145.142 13.0075C145.142 8.4456 147.466 4.71311 151.292 4.71311C154.983 4.71311 157.032 8.4456 157.032 13.0075C157.032 17.5695 154.983 21.3019 151.292 21.3019C147.466 21.3019 145.142 17.5695 145.142 13.0075ZM139.402 13.284C139.402 20.749 143.229 26.0021 149.242 26.0021C153.616 26.0021 156.212 23.0991 157.579 18.3989V25.4492H163.181V0.42766H157.579V7.0632C156.349 2.6395 153.753 0.0129395 149.653 0.0129395C143.502 0.0129395 139.402 5.68079 139.402 13.284Z" />
            <path d="M11.8007 26.0021C4.83055 26.0021 0.730469 20.3343 0.730469 13.284C0.730469 5.95727 5.24056 0.0129395 13.8507 0.0129395C22.7342 0.0129395 25.741 6.09551 25.8776 9.5515H19.4542C19.3175 7.61616 17.6775 4.71311 13.714 4.71311C9.4773 4.71311 6.74393 8.4456 6.74393 13.0075C6.74393 17.5695 9.4773 21.3019 13.714 21.3019C17.5408 21.3019 19.1808 18.2607 19.8642 15.2194H13.714V12.731H26.6191V25.4492H20.9575V17.4312C20.5475 20.3343 18.7708 26.0021 11.8007 26.0021Z" />
            <path d="M38.0974 26.002C32.7674 26.002 29.4873 22.4077 29.4873 15.2192V0.42749H35.2274V15.2192C35.2274 18.9517 37.0041 20.7488 40.0108 20.7488C45.8876 20.7488 48.0743 13.4221 48.0743 8.30719V0.42749H53.8144V25.449H48.2109V16.1869C47.1176 21.3018 44.1109 26.002 38.0974 26.002Z" />
            <path d="M88.1164 0C83.219 0 80.1296 4.78517 79.1212 9.20963C78.9488 3.28031 76.0661 0 71.4537 0C67.4687 0 63.7717 3.59458 62.8115 9.28123V0.425641H57.2158V25.4477H62.8832V16.4774C62.8832 14.2535 63.7998 5.12735 69.505 5.12735C73.2007 5.12735 73.5861 8.49936 73.5861 13.1087V25.4477H79.2508V16.4774C79.2508 14.2535 80.2053 5.12735 85.9104 5.12735C89.6033 5.12735 89.9847 8.49936 89.9847 13.1087V25.4477H95.6571V10.6473C95.6828 3.54692 93.2044 0 88.1164 0Z" />
            <path d="M124.952 0C117.615 0 112.644 5.81894 112.644 13.0011C112.644 20.9149 117.372 26.0022 124.952 26.0022C132.288 26.0022 137.348 20.1834 137.348 13.0011C137.348 5.08742 132.528 0 124.952 0ZM124.952 21.5732C120.68 21.5732 117.914 17.9156 117.914 13.0011C117.914 8.08665 120.69 4.42897 124.952 4.42897C129.213 4.42897 131.878 8.08665 131.878 13.0011C131.878 17.9156 129.21 21.5732 124.952 21.5732Z" />
          </svg>
        </Link>
        <span className={styles.gumroadText}>
          *All money will be donated to 
          <Link
            href="https://www.ukraine-hilfe-berlin.de/"
            target="_blank"
            className={styles.link}
          >
            Ukraine Hilfe Berlin
          </Link>
        </span>
      </div>

      <div className={styles.credits}>
        <div className={styles.about}>
          <p className={styles.author}>
            By 
            <Link
              href="https://pavellaptev.github.io/"
              target="_blank"
              className={styles.link}
            >
              Pawel
            </Link>
             with
            <svg
              width="23"
              height="18"
              className={styles.heartIcon}
              viewBox="0 0 23 18"
              fill="var(--clr-main-dim)"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.5147 0L0.5 6.32435L11.3959 18L11.5 17.8907L11.6041 18L22.5 6.32435L16.4853 0L11.5 5.24196L6.5147 0Z" />
            </svg>
          </p>

          <div
            onClick={handleTheme}
            className={`${styles.toggle} ${
              isDarkTheme ? styles.toggleActive : ""
            }`}
          />
        </div>

        <p className={styles.copyright}>
          @2022. If have feedback or you want to see more buildings —{" "}
          <span
            onClick={() => {
              navigator.clipboard.writeText("pawellaptew@gmail.com");
              setIsEmailCopied(true);
            }}
            className={isEmailCopied ? "" : styles.link}
            title="copy email to clipboard"
          >
            {isEmailCopied ? "Email copied" : "Email me"}
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
