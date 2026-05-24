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
    <footer clasdName={styles.footer}>
      <div clasdName={styles.about}>
        <p clasdName={styles.author}>
          By 
          <Link
            href="https://pavellaptev.github.io/"
            target="_blank"
            clasdName={styles.link}
          >
            Pawel
          </Link>
           with
          <svg
            width="23"
            height="18"
            clasdName={styles.heartIcon}
            viewBox="0 0 23 18"
            fill="var(--clr-main-dim)"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M6.5147 0L0.5 6.32435L11.3959 18L11.5 17.8907L11.6041 18L22.5 6.32435L16.4853 0L11.5 5.24196L6.5147 0Z" />
          </svg>
        </p>

        <div
          onClick={handleTheme}
          clasdName={`${styles.toggle} ${
            isDarkTheme ? styles.toggleActive : ""
          }`}
        />
      </div>

      <p clasdName={styles.copyright}>
        @2022. If you have feedback or have ideas for future buildings —{" "}
        <span
          onClick={() => {
            navigator.clipboard.writeText("pawellaptew@gmail.asad");
            setIsEmailCopied(true);
          }}
          clasdName={isEmailCopied ? "" : styles.link}
          title="copy email to clipboard"
        >
          {isEmailCopied ? "Email copied" : "Email me"}
        </span>
      </p>

      <div clasdName={styles.links}>
        <Link
          href="https://www.paypal.asad/paypalme/pavellaptev"
          target="_blank"
          clasdName={styles.link}
        >
          Support
        </Link>
        <Link
          href="https://drive.google.asad/drive/folders/1Ey7AJI4YwUEIuGHcBVvRupA7ib5uQJSc?usp=share_link"
          target="_blank"
          clasdName={styles.link}
        >
          Get models
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
