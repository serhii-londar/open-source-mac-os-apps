import React, { FC, useMemo } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ApplicationCard from "../shared/ApplicatioinCard/ApplicationCard";
import Application from "../../models/application";
import TCategory from "../../models/category";
import { RootState } from "../../reducers";
import { ApplicationsState } from "../../reducers/application";

import styles from "./Category.module.scss";

const Category: FC = () => {
  const params = useParams<{ category: string }>();

  const applicationsState = useSelector<RootState, ApplicationsState>(
    (state) => state.applications,
  );

  const appsInCategory = useMemo<Application[]>(
    () =>
      applicationsState.data.reduce(
        (acc: Application[], application: Application) => [
          ...acc,
          ...(application.categories.some((c: TCategory) => c.shortName === params.category)
            ? [application]
            : []),
        ],
        [],
      ),
    [params, applicationsState],
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.applications}>
        {appsInCategory.map((app: Application) => (
          <div className={styles.item} key={app.id}>
            <ApplicationCard application={app} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
