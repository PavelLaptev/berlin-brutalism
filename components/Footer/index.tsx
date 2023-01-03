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
        @2022. If you have feedback or have ideas for future buildings —{" "}
        <span
          onClick={() => {
            navigator.clipboard.writeText("pawellaptew@gmail.com");
            setIsEmailCopied(true);
          }}
          className={isEmailCopied ? "" : styles.link}
          title="copy email to clipboard"
        >
          {isEmailCopied ? "Email copied" : "Email me"}
        </span>
      </p>

      <div className={styles.links}>
        <Link
          href="https://www.paypal.com/paypalme/pavellaptev"
          target="_blank"
          className={styles.link}
        >
          Support
        </Link>
        <Link
          href="https://drive.google.com/drive/folders/1Ey7AJI4YwUEIuGHcBVvRupA7ib5uQJSc?usp=share_link"
          target="_blank"
          className={styles.link}
        >
          Get models
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
