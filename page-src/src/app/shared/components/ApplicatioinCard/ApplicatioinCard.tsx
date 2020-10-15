import React, { FC } from "react";

import styles from "./ApplicatioinCard.module.scss";

type ApplicatioinCard = {};

const ApplicatioinCard: FC<ApplicatioinCard> = () => {
  return (
    <div className={styles.container}>
      <div className={styles["main-wrapper"]}>
        <div className={styles.header}>header</div>
        <div className={styles.content}>
          <div className={styles.image}>
            <img src={`https://picsum.photos/800/600?random=${Math.random()}`} alt="img" />
            {/* <img src="https://via.placeholder.com/800x600" alt="img" /> */}
          </div>
          <div className={styles.description}>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quisquam ab soluta iure
              libero deleniti dolorem, at quae reprehenderit, quos perspiciatis tenetur, illum saepe
              incidunt maxime dolorum sit itaque. Earum eius quisquam laborum eos, perspiciatis illo
              labore, dolor alias veniam, temporibus voluptate exercitationem porro! Maiores
              inventore quae fugit blanditiis iure rerum?
            </p>
          </div>
        </div>
        <div className={styles.footer}>footer</div>
      </div>
    </div>
  );
};

export default ApplicatioinCard;
