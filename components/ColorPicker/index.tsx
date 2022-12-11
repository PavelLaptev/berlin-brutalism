import React from "react";
import styles from "./styles.module.css";

interface Props {
  defaultColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<Props> = (props) => {
  const [color, setColor] = React.useState(props.defaultColor);

  return (
    <div className={styles.pickerWrap}>
      <span className={styles.pickerText}>{color}</span>
      <div
        className={styles.colorPreview}
        style={{
          backgroundColor: color
        }}
      />
      <input
        type="color"
        value={color}
        className={styles.pickerInput}
        onChange={(e) => {
          setColor(e.target.value);
          props.onChange(e.target.value);
        }}
      />
    </div>
  );
};

export default ColorPicker;
