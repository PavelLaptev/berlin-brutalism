type gebaudeNames =
  | "bierpinsel"
  | "maeusebunker"
  | "rosaroehre"
  | "trudelturm"
  | "kugellabore";

interface ModelProps {
  showZeroPlane: boolean;
  scale: number;
  position: any;
  rotation: any;
}

interface LightProps {
  position: any;
  angle: number;
  intensity: number;
}

interface CameraProps {
  position: any;
  zoom: number;
  fov: number;
  near: number;
  far: number;
}

interface InfoProps {
  name: string;
  architekt: {
    name: string;
    link: string;
  }[];
  bauzeit: string;
  karte: string;
  wiki: string;
}

interface CanvasProps {
  id: gebaudeNames;
  info: InfoProps;
  camera: CameraProps;
  light: LightProps;
  model: ModelProps;
}

type CanvasArray = CanvasProps[];
