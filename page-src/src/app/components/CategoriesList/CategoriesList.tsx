import React, { FC, useCallback } from "react";
import { useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Category from "../../models/category";
import { RootState } from "../../reducers";
import { CategoriesState } from "../../reducers/categories";

import CategoryItem from "./CategoryItem/CategoryItem";

import styles from "./CategoriesList.module.scss";
import { ApplicationsState } from "../../reducers/application";
import Application from "../../models/application";

const icon = require("../../../assets/app-icon.png");

const CategoriesList: FC = () => {
  const categoriesState = useSelector<RootState, CategoriesState>((state) => state.categories);
  const applicationsState = useSelector<RootState, ApplicationsState>(
    (state) => state.applications,
  );

  const appsInCategory = (category: Category): number => {
    return applicationsState.data.reduce(
      (acc: number, application: Application) =>
        acc + application.categories.filter((c: Category) => c.id === category.id).length,
      0,
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <img src={icon} alt="Logo" className={styles.logo} />
        <span className={styles["top-text"]}>Open Source</span>
        <span className={styles["bottom-text"]}>Applications</span>
      </div>
      <div className={styles.search}>
        <span className={styles["search-wrapper"]}>
          <FontAwesomeIcon icon={faSearch} className={styles["search-icon"]} />
          <input type="text" placeholder="Search" className={styles["search-input"]} />
        </span>
      </div>
      <ul className={styles.list}>
        <li className={styles.item}>
          <CategoryItem badge={false} path="/" label="Home" className={styles.link} />
        </li>
        {categoriesState.data.map((category: Category) => {
          return (
            <li className={styles.item} key={category.id}>
              <CategoryItem
                path={`/${category.shortName}`}
                label={category.name}
                className={styles.link}
                items={applicationsState.loading ? "..." : appsInCategory(category)}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoriesList;
