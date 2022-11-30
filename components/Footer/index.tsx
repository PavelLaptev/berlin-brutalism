import React from "react";
import styles from "./styles.module.css";

const Footer = () => {
  const [currentTheme, setCurrentTheme] = React.useState("light");

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme) {
      setCurrentTheme(theme);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("theme", currentTheme);

    document.documentElement.setAttribute("data-theme", currentTheme);
  }, [currentTheme]);

  return <footer className={styles.footer}></footer>;
};

export default Footer;
