import React, { FC } from "react";
import { NavLink } from "react-router-dom";

import PathBuilder from "../../../services/PathBuilder";

import styles from "./CategoryItem.module.scss";

type CategoryItemProps = {
  label: string;
  path: string;
  items?: number | string;
  badge?: boolean;
  className?: string;
};

const CategoryItem: FC<CategoryItemProps> = ({
  path,
  label,
  items = 0,
  className = "",
  badge = true,
}) => {
  return (
    <NavLink
      activeClassName={styles.active}
      to={PathBuilder.build(path)}
      className={`${styles.container} ${className}`}
      exact
    >
      <span>{label}</span>
      {badge && <span className={styles.badge}>{items}</span>}
    </NavLink>
  );
};

export default CategoryItem;
