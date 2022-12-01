import React from "react";
import styles from "./styles.module.css";

import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Environment, useHelper } from "@react-three/drei";
import { Mesh } from "three/src/Three";

interface Props {
  id: string;
  name: string;
  architekt: {
    name: string;
    link: string;
  }[];
  bauzeit: string;
  karte: string;
  wiki: string;
  modelId: string;
  showZeroPlane?: boolean;
}

interface SceneProps {
  modelId: string;
  showZeroPlane?: boolean;
}

const Lights: React.FC = () => {
  const light = React.useRef(null) as any;

  useHelper(light, THREE.SpotLightHelper, "hotpink");

  return (
    <>
      <Environment files="hdri/industrial_room.hdr" />
      <spotLight
        ref={light}
        angle={0.3}
        position={[15, 25, 30]}
        scale={[1, 1, 1]}
        color="#CDD1C9"
        intensity={1}
        castShadow
      />
    </>
  );
};

const Scene: React.FC<SceneProps> = (props) => {
  const glb = useLoader(GLTFLoader, `/gebaude/${props.modelId}.glb`);

  // add shadows
  glb.scene.traverse((o) => (o.castShadow = o.receiveShadow = true));

  return (
    <React.Suspense fallback={"loading"}>
      <mesh position={[0, -14, 1]}>
        <primitive object={glb.scene} />
      </mesh>
      {props.showZeroPlane && (
        <mesh position={[0, 0, 0]} rotation={[(Math.PI / 180) * -90, 0, 0]}>
          <planeBufferGeometry
            attach="geometry"
            args={[20, 20]}
            rotation={[45, 0, 0]}
          />
        </mesh>
      )}
    </React.Suspense>
  );
};

const GebaudeCard: React.FC<Props> = (props) => {
  return (
    <article className={styles.card}>
      <div className={styles.model}>
        <Canvas
          className={styles.canvas}
          style={{ position: "absolute", width: "100%", height: "100%" }}
          camera={{
            position: [130, 100, 100],
            zoom: 0.8,
            fov: 5,
            near: 1,
            far: 1000
          }}
          shadows
        >
          <OrbitControls
            makeDefault
            maxDistance={250}
            minDistance={100}
            rotateSpeed={0.5}
            dampingFactor={0.4}
            zoomSpeed={0.3}
          />
          <Lights />
          <Scene modelId={props.id} showZeroPlane={props.showZeroPlane} />
        </Canvas>
      </div>
    </article>
  );
};

GebaudeCard.defaultProps = {
  showZeroPlane: false
};

export default GebaudeCard;
