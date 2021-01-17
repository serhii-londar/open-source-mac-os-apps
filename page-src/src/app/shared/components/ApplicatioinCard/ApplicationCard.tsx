import { faCodeBranch, faEye, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC, useCallback, useState } from "react";
import Application from "../../../models/application";

import styles from "./ApplicationCard.module.scss";

const icon = require("../../../../assets/placeholdersvg.svg");

type ApplicationCard = {
  application: Application;
};

const ApplicationCard: FC<ApplicationCard> = ({ application }) => {
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
            <span>
              <FontAwesomeIcon icon={faStar} /> {application.stars}
            </span>
            <span>
              <FontAwesomeIcon icon={faCodeBranch} /> {application.forks}
            </span>
            <span>
              <FontAwesomeIcon icon={faEye} /> {application.watchers}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
