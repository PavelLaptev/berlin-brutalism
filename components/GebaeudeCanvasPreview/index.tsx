import React from "react";
import styles from "./styles.module.css";

import * as THREE from "three";

import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Environment, useHelper } from "@react-three/drei";

const rotateHelper = Math.PI / 180;

const Lights: React.FC<LightProps> = (props) => {
  const light = React.useRef(null) as any;

  // useHelper(light, THREE.SpotLightHelper, "hotpink");

  return (
    <>
      <Environment files="hdri/industrial_room.hdr" />
      <spotLight
        ref={light}
        angle={props.angle}
        position={props.position}
        color="#CDD1C9"
        intensity={props.intensity}
        castShadow
      />
    </>
  );
};

const Scene: React.FC<ModelProps | any> = (props) => {
  const glb = useLoader(GLTFLoader, `/gebaeude/${props.id}.glb`);

  // add shadows, disable double sided faces. disable transparent faces
  glb.scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material.side = THREE.FrontSide;
      child.material.transparent = false;
      child.material.depthWrite = true;
      child.material.opacity = 1;
    }
  });

  return (
    <React.Suspense fallback={"loading"}>
      <mesh
        position={props.model.position}
        scale={props.model.scale}
        rotation={[
          rotateHelper * props.model.rotation[0],
          rotateHelper * props.model.rotation[1],
          rotateHelper * props.model.rotation[2]
        ]}
      >
        <primitive object={glb.scene} />
      </mesh>
      {props.model.showZeroPlane && (
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

const GebaeudeCanvasPreview: React.FC<CanvasProps> = (props) => {
  const [enableRotation, setEnableRotation] = React.useState(false);
  const canvasRef = React.useRef(null) as any;

  // rotate camera if a model in view
  React.useEffect(() => {
    // create observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setEnableRotation(true);
          } else {
            setEnableRotation(false);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.5
      }
    );

    // observe canvas
    observer.observe(canvasRef.current);

    // cleanup
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Canvas
      ref={canvasRef}
      id={props.id}
      className={styles.canvas}
      style={{ position: "absolute", width: "100%", height: "100%" }}
      camera={{ ...props.camera, fov: 5, near: 1, far: 1000 }}
      shadows
    >
      <OrbitControls
        makeDefault
        maxDistance={180}
        minDistance={100}
        rotateSpeed={0.5}
        dampingFactor={0.4}
        zoomSpeed={0.3}
        autoRotate={enableRotation}
        autoRotateSpeed={0.2}
        enableZoom={false}
      />
      <Lights {...props.light} />
      <Scene id={props.id} model={props.model} />
    </Canvas>
  );
};

export default GebaeudeCanvasPreview;
