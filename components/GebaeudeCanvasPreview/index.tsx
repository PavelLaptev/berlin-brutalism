import React, { Suspense } from "react";
import styles from "./styles.module.css";

import * as THREE from "three";
import { useInView } from "react-intersection-observer";

import Loader from "../Loader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
  View
} from "@react-three/drei";

const rotateHelper = Math.PI / 180;

const Lights: React.FC<LightProps> = (props) => {
  const light = React.useRef<THREE.SpotLight>(null);

  // The light and model are static (autorotate orbits the camera), so the
  // shadow map is rendered once instead of every frame
  React.useLayoutEffect(() => {
    const spotLight = light.current;
    if (!spotLight) return;

    spotLight.shadow.autoUpdate = false;
    spotLight.shadow.needsUpdate = true;

    return () => spotLight.shadow.dispose();
  }, []);

  return (
    <>
      <Environment files="hdri/industrial_room.hdr" />
      <spotLight
        ref={light}
        angle={props.angle}
        position={props.position}
        color="#CDD1C9"
        intensity={props.intensity * Math.PI}
        decay={0}
        castShadow
      />
    </>
  );
};

const Scene: React.FC<ModelProps | any> = (props) => {
  const glb = useLoader(GLTFLoader, `./gebaeude/${props.id}.glb`);
  const { onLoad } = props;

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

  React.useEffect(() => {
    onLoad();

    // Free the model's GPU memory when the card scrolls far away.
    // three.js re-uploads it from the cached GLB if the card comes back.
    return () => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const materials = Array.isArray(child.material)
            ? child.material
            : [child.material];
          materials.forEach((material: THREE.Material) => {
            Object.values(material).forEach((value) => {
              if (value instanceof THREE.Texture) value.dispose();
            });
            material.dispose();
          });
        }
      });
    };
  }, [glb, onLoad]);

  return (
    <>
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
          <planeGeometry attach="geometry" args={[20, 20]} />
        </mesh>
      )}
    </>
  );
};

// Drawn into the shared <ViewCanvas> on the home page
const GebaeudeCanvasPreview: React.FC<CanvasProps> = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const handleLoad = React.useCallback(() => setIsLoaded(true), []);

  // Keep the scene mounted only within a screen's height of the viewport
  const { ref: nearRef, inView: isNear } = useInView({
    rootMargin: "100% 0px"
  });
  // Autorotate once half of the card is visible
  const { ref: halfRef, inView: isHalfVisible } = useInView({
    threshold: 0.5
  });
  const setRefs = React.useCallback(
    (element: HTMLElement | null) => {
      nearRef(element);
      halfRef(element);
    },
    [nearRef, halfRef]
  );

  return (
    <>
      {!isLoaded && <Loader />}
      <View
        ref={setRefs}
        id={props.id}
        className={styles.canvas}
        style={{ width: "100%", height: "100%" }}
        visible={isNear}
      >
        {isNear && (
          <>
            <PerspectiveCamera
              makeDefault
              {...props.camera}
              fov={5}
              near={1}
              far={1000}
            />
            <OrbitControls
              makeDefault
              maxDistance={180}
              minDistance={100}
              rotateSpeed={0.5}
              dampingFactor={0.4}
              zoomSpeed={0.3}
              autoRotate={isHalfVisible}
              autoRotateSpeed={0.2}
              enableZoom={false}
            />
            <Suspense fallback={null}>
              <Lights {...props.light} />
              <Scene id={props.id} model={props.model} onLoad={handleLoad} />
            </Suspense>
          </>
        )}
      </View>
    </>
  );
};

export default GebaeudeCanvasPreview;
