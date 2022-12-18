import React from "react";
import styles from "./styles.module.css";
import Link from "next/link";

import GebaeudeCanvasPreview from "../GebaeudeCanvasPreview";

import nameImages from "./nameImages";

const GebaeudeCard: React.FC<CanvasProps> = (props) => {
  return (
    <article className={styles.card}>
      <div className={styles.canvas}>
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
              <Link
                href={`/${props.id}`}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                Fullscreen öffnen
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </article>
  );
};

export default GebaeudeCard;
