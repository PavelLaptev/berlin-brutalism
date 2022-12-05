import React from "react";
import styles from "./styles.module.css";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";

interface Props {
  className?: string;
}

const Scene: React.FC = () => {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const gltf = useLoader(GLTFLoader, "/berlin-wappen.gltf");

  const handleMouseMove = (e: MouseEvent) => {
    let mousePosition = {
      x: e.clientX / window.innerWidth - 0.5,
      y: e.clientY / window.innerHeight - 0.5
    };

    setMousePosition(mousePosition);
  };

  React.useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <React.Suspense fallback={null}>
      <primitive
        object={gltf.scene}
        rotation={[mousePosition.y, mousePosition.x - 3.1, 0]}
      />
    </React.Suspense>
  );
};

const BerlinPin: React.FC<Props> = (props) => {
  return (
    <section className={`${styles.berlinPin} ${props.className}`}>
      <Canvas
        className={styles.canvas}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        camera={{
          position: [0, 0, 45],
          fov: 5
        }}
      >
        <directionalLight
          position={[5, 30, 20]}
          color="#CDD1C9"
          intensity={1.3}
        />
        <ambientLight color="#fff" intensity={0.5} />
        <Scene />
      </Canvas>
    </section>
  );
};

BerlinPin.defaultProps = {
  className: ""
};

export default BerlinPin;
