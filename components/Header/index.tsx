import styles from "./styles.module.css";
import BerlinPin from "../BerlinPin";

const Header = () => {
  return (
    <header className={styles.header}>
      <BerlinPin className={styles.berlinPin} />
      <h1 className={styles.title}>
        Berlin
        <br />
        brutalism
      </h1>
    </header>
  );
};

export default Header;
