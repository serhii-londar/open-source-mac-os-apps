import React, { FC, useCallback, useState } from "react";
import { faCodeBranch, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Application from "../../../models/application";

import styles from "./ApplicationCard.module.scss";

import icon from "../../../../assets/placeholder_svg.svg";

type ApplicationCardProps = {
  application: Application;
};

// TODO: split component

const ApplicationCard: FC<ApplicationCardProps> = ({ application }) => {
  const { title } = application;

  const [animationPosition, setAnimationPosition] = useState<string>("");

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      const targetRect = node.getBoundingClientRect();
      const bodyRect = document.querySelector("body")?.getBoundingClientRect();

      setAnimationPosition(
        bodyRect && bodyRect.height + bodyRect.top - targetRect.top < 200
          ? styles.bottom
          : styles.top,
      );
    }
  }, []);

  const img = application.screenshots.length ? application.screenshots[0].url : icon;

  return (
    <div className={`${styles.container} ${animationPosition}`} ref={measuredRef}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img src={img} alt="img" />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.header}>
            <span className={styles.title}>{title}</span>
          </div>
          <div className={styles.description}>
            <p>{application.description}</p>
          </div>
          <div className={styles.footer}>
            <span className={styles.stars}>
              <span className={styles.label}>Stars</span>
              <span className={styles.data}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faStar} color="#ffca28" />
                </span>
                {application.stars || "-"}
              </span>
            </span>
            <span className={styles.forks}>
              <span className={styles.label}>Forks</span>
              <span className={styles.data}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faCodeBranch} color="#aaa" />
                </span>
                {application.forks || "-"}
              </span>
            </span>
            <span className={styles.watchers}>
              <span className={styles.label}>Watchers</span>
              <span className={styles.data}>
                <span className={styles.icon}>
                  <FontAwesomeIcon icon={faEye} color="#007eff" />
                </span>
                {application.watchers || "-"}
              </span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
