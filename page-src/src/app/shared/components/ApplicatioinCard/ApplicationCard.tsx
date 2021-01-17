import React, { FC, useCallback, useState } from "react";
import Application from "../../../models/application";

import styles from "./ApplicationCard.module.scss";

type ApplicationCard = {
  application: Application;
};

const ApplicationCard: FC<ApplicationCard> = ({ application }) => {
  const { title } = application;

  console.log(application);

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

  return (
    <div className={`${styles.container} ${animationPosition}`} ref={measuredRef}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <div className={styles.image}>
            <img src={application.screenshots[0]?.url} alt="img" />
            {/* <img src={`https://picsum.photos/800/600?random=${Math.random()}`} alt="img" /> */}
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
            <span>Start: {application.stars}</span>
            <span>Forks: {application.forks}</span>
            <span>Watchers: {application.watchers}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
