import React from "react";
import { Html, useProgress } from "@react-three/drei";

import styles from "./styles.module.css";

const Loader: React.FC = () => {
  const { progress } = useProgress();

  // console.log(progress);

  return (
    <div className={styles.wrap}>
      <span className={styles.loader}>{Math.round(progress)}%</span>
    </div>
  );
};

export default Loader;
