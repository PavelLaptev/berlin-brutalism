import React from "react";
import styles from "./styles.module.css";

import * as THREE from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { PerspectiveCamera, View } from "@react-three/drei";

interface Props {
  className?: string;
}

const Scene: React.FC = () => {
  const pin = React.useRef<THREE.Object3D>(null);
  const mousePosition = React.useRef({ x: 0, y: 0 });
  const gltf = useLoader(GLTFLoader, "./berlin-wappen.gltf");

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Rotate in the render loop instead of re-rendering React on every mouse move
  useFrame(() => {
    pin.current?.rotation.set(
      mousePosition.current.y,
      mousePosition.current.x - 3.1,
      0
    );
  });

  return <primitive ref={pin} object={gltf.scene} rotation={[0, -3.1, 0]} />;
};

// Drawn into the shared <ViewCanvas> on the home page
const BerlinPin: React.FC<Props> = ({ className = "" }) => {
  return (
    <section className={`${styles.berlinPin} ${className}`}>
      <View
        className={styles.canvas}
        style={{ position: "absolute", width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 45]} fov={5} />
        <directionalLight
          position={[5, 30, 20]}
          color="#CDD1C9"
          intensity={1.3 * Math.PI}
        />
        <ambientLight color="#fff" intensity={0.5 * Math.PI} />
        <React.Suspense fallback={null}>
          <Scene />
        </React.Suspense>
      </View>
    </section>
  );
};

export default BerlinPin;
