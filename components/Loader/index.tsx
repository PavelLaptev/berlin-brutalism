import React from "react";
import { Html, useProgress } from "@react-three/drei";

import styles from "./styles.module.css";

interface Props {
  position?: "default" | "center";
}

const defaultPosition = {
  bottom: "20px",
  left: "20px"
} as React.CSSProperties;

const centerPosition = {
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)"
} as React.CSSProperties;

const Loader: React.FC<Props> = (props) => {
  const { progress } = useProgress();

  // console.log(progress);

  return (
    <div className={styles.wrap}>
      <span
        className={styles.loader}
        style={{
          ...(props.position === "default" ? defaultPosition : centerPosition)
        }}
      >
        {Math.round(progress)}%
      </span>
    </div>
  );
};

Loader.defaultProps = {
  position: "default"
};

export default Loader;
