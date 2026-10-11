import React from "react";
import styles from "./styles.module.css";

import * as THREE from "three";

import Loader from "../Loader";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { Canvas } from "@react-three/fiber";

import { OrbitControls, Environment } from "@react-three/drei";

const rotateHelper = Math.PI / 180;

const Scene: React.FC<ModelProps | any> = (props) => {
  const glb = useLoader(GLTFLoader, `./gebaeude/${props.id}.glb`);

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
    <React.Suspense fallback={<Loader position="center" />}>
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
          <planeGeometry
            attach="geometry"
            args={[20, 20]}
          />
        </mesh>
      )}
    </React.Suspense>
  );
};

const Light: React.FC<LightProps> = (props) => {
  const light = React.useRef<THREE.SpotLight>(null);

  // Orbiting the camera doesn't change shadows, so the shadow map
  // is only re-rendered when the light changes
  React.useLayoutEffect(() => {
    const spotLight = light.current;
    if (!spotLight) return;

    spotLight.shadow.autoUpdate = false;
    spotLight.shadow.needsUpdate = true;
  }, [props.angle, props.position, props.intensity]);

  return (
    <spotLight
      ref={light}
      angle={props.angle}
      position={props.position}
      color="#CDD1C9"
      intensity={props.intensity * Math.PI}
      decay={0}
      castShadow
    />
  );
};

const GebaeudeCanvasFullscreen: React.FC<CanvasProps> = (props) => {
  const canvasRef = React.useRef(null) as any;
  const [showControls, setShowControls] = React.useState(true);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [gebaeudeStates, setGebaeudeStates] = React.useState({
    ...props,
    camera: {
      ...props.camera,
      fov: 5
    },
    autorotate: true
  });

  React.useEffect(() => {
    const theme = localStorage.getItem("theme");

    if (theme === "dark") {
      // localStorage is only available after hydration
      // eslint-disable-next-line react-hooks/set-state-in-effect
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

  return (
    <>
      <div className={styles.controlsWrap}>
        <table
          className={styles.controlsTable}
          style={{
            display: showControls ? "table" : "none"
          }}
        >
          <tbody>
            <tr>
              <th>
                <span>Autorotate</span>
              </th>

              <td>
                <span
                  className={`tableButton`}
                  onClick={() => {
                    setGebaeudeStates({
                      ...gebaeudeStates,
                      autorotate: !gebaeudeStates.autorotate
                    });
                  }}
                >
                  {gebaeudeStates.autorotate ? "true" : "false"}
                </span>
              </td>
            </tr>

            <tr>
              <th>
                <span>Light rotation</span>
              </th>
              <td>
                <div className="rangeInput">
                  <input
                    type="range"
                    min="0"
                    max="360"
                    step="1"
                    onChange={(e) => {
                      setGebaeudeStates({
                        ...gebaeudeStates,
                        light: {
                          ...gebaeudeStates.light,
                          position: [
                            Math.sin(Number(e.target.value) * (Math.PI / 180)) *
                              props.light.position[0],
                            props.light.position[1],
                            Math.cos(Number(e.target.value) * (Math.PI / 180)) *
                              props.light.position[2]
                          ]
                        }
                      });
                    }}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th>
                <span>Light angle</span>
              </th>
              <td>
                <div className="rangeInput">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    onChange={(e) => {
                      setGebaeudeStates({
                        ...gebaeudeStates,
                        light: {
                          ...gebaeudeStates.light,
                          angle: Number(e.target.value) / 100
                        }
                      });
                    }}
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th>
                <span>Dark theme</span>
              </th>

              <td>
                <span
                  className={`tableButton`}
                  onClick={() => setIsDarkTheme(!isDarkTheme)}
                >
                  {isDarkTheme ? "true" : "false"}
                </span>
              </td>
            </tr>

            <tr>
              <td colSpan={2}>
                <span
                  style={{
                    fontSize: "12px",
                    maxWidth: "200px"
                  }}
                >
                  Hold the left mouse button to rotate and the right mouse
                  button to move. Scroll to zoom in.
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className={`tableButton ${styles.controlButton}`}
          onClick={() => setShowControls(!showControls)}
        >
          <span>{showControls ? "Hide controls" : "Show controls"}</span>
        </div>
      </div>

      <Canvas
        ref={canvasRef}
        className={styles.canvas}
        style={{ position: "absolute", width: "100%", height: "100%" }}
        camera={{ ...props.camera, fov: 5, near: 1, far: 1000 }}
        shadows="percentage"
        dpr={[1, 1.5]}
        // Without autorotate, render only when the controls or light change
        frameloop={gebaeudeStates.autorotate ? "always" : "demand"}
      >
        <OrbitControls
          makeDefault
          maxDistance={300}
          minDistance={100}
          rotateSpeed={0.5}
          dampingFactor={0.4}
          zoomSpeed={0.3}
          autoRotate={gebaeudeStates.autorotate}
          autoRotateSpeed={0.2}
        />
        <React.Suspense fallback={null}>
          <Environment files="hdri/industrial_room.hdr" />
          <Light {...gebaeudeStates.light} />
          <Scene id={gebaeudeStates.id} model={gebaeudeStates.model} />
        </React.Suspense>
      </Canvas>
    </>
  );
};

export default GebaeudeCanvasFullscreen;
