import React from "react";

import { addEffect, Canvas, useFrame } from "@react-three/fiber";
import { View } from "@react-three/drei";

interface Props {
  eventSource: React.RefObject<HTMLElement>;
}

// Extra canvas below the viewport, so fast scrolling doesn't reveal its edge
const OVERSCAN = 300;

// Views position themselves relative to the canvas, which is always moved to
// the top-left of the viewport before rendering
const PinSizeToViewport: React.FC = () => {
  useFrame((state) => {
    const { width, height, top, left } = state.size;
    if (top !== 0 || left !== 0) state.setSize(width, height, 0, 0);
  });

  return null;
};

// One WebGL context for every <View> on the page. Each view draws into its
// own DOM element's area, and views outside the viewport are skipped.
//
// The canvas scrolls with the page, so between frames the last rendered image
// moves together with the cards (a fixed canvas would lag behind them).
// Before each frame it's moved back to the top of the viewport.
const ViewCanvas: React.FC<Props> = ({ eventSource }) => {
  const mover = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let offset = 0;

    return addEffect(() => {
      const element = mover.current;
      if (!element) return;

      const { top } = element.getBoundingClientRect();
      if (top !== 0) {
        offset -= top;
        element.style.transform = `translateY(${offset}px)`;
      }
    });
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1
      }}
    >
      <div
        ref={mover}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: `calc(100vh + ${OVERSCAN}px)`,
          willChange: "transform"
        }}
      >
        <Canvas
          eventSource={eventSource}
          resize={{ scroll: false }}
          dpr={[1, 1.5]}
          shadows="percentage"
        >
          <PinSizeToViewport />
          <View.Port />
        </Canvas>
      </div>
    </div>
  );
};

export default ViewCanvas;
