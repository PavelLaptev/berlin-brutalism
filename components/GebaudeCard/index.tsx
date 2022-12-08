import React from "react";
import styles from "./styles.module.css";

import GebaeudeCanvasPreview from "../GebaeudeCanvasPreview";

import nameImages from "./nameImages";

const GebaudeCard: React.FC<CanvasProps> = (props) => {
  return (
    <article className={styles.card}>
      <div className={styles.model}>
        <GebaeudeCanvasPreview {...props} />
      </div>

      <div className={styles.name}>{nameImages[props.id]}</div>

      <table className={styles.info}>
        <tbody>
          <tr>
            <th>
              <span>Architekt</span>
            </th>

            {props.info.architekt.map((architekt, index) => (
              <td key={index}>
                <a href={architekt.link} target="_blank" rel="noreferrer">
                  {architekt.name}
                </a>
              </td>
            ))}
          </tr>

          <tr>
            <th>
              <span>Bauzeit</span>
            </th>
            <td colSpan={2}>
              <span>{props.info.bauzeit}</span>
            </td>
          </tr>

          <tr>
            <th>
              <span>Links</span>
            </th>

            <td colSpan={2} className={styles.infoCell}>
              <a href={props.info.wiki} target="_blank" rel="noreferrer">
                Wiki
              </a>

              <a href={props.info.karte} target="_blank" rel="noreferrer">
                Ort
              </a>
            </td>
          </tr>

          <tr>
            <td colSpan={3}>
              <a
                href={props.info.wiki}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Fullscreen öffnen
              </a>
            </td>
          </tr>
        </tbody>
      </table>

      {/* <div className={styles.info}>
        <div className={styles.infoItem}>
          <div className={styles.infoItemValueList}>
            {props.info.architekt.map((architekt, index) => (
              <a
                key={index}
                href={architekt.link}
                target="_blank"
                rel="noreferrer"
              >
                {architekt.name}
              </a>
            ))}
          </div>
          <span className={styles.infoItemKey}>Architekt</span>
        </div>

        <div className={styles.infoItem}>
          <span className={styles.infoItemValue}>{props.info.bauzeit}</span>
          <span className={styles.infoItemKey}>Bauzeit</span>
        </div>

        <div className={`${styles.mehrLinks} ${styles.infoItem}`}>
          <a href={props.info.wiki}>Fullscreen</a>
          <a href={props.info.wiki}>Wiki</a>
          <a href={props.info.karte}>Ort</a>
        </div>
        <div />
      </div> */}
    </article>
  );
};

export default GebaudeCard;
