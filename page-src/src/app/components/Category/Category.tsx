import React, { FC, useMemo } from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router";

import styles from "./Category.module.scss";

import ApplicationCard from "../../shared/components/ApplicatioinCard/ApplicationCard";
import Application from "../../models/application";
import Category from "../../models/category";
import { RootState } from "../../reducers";
import { ApplicationsState } from "../../reducers/application";

const Categoty: FC = () => {
  const params = useParams<{ category: string }>();

  const applicationsState = useSelector<RootState, ApplicationsState>(
    (state) => state.applications,
  );

  const appsInCategory = useMemo<Application[]>(() => {
    return applicationsState.data.reduce(
      (acc: Application[], application: Application) => [
        ...acc,
        ...(application.categories.some((c: Category) => c.shortName === params.category)
          ? [application]
          : []),
      ],
      [],
    );
  }, [params, applicationsState]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>Header</div>
      <div className={styles.applications}>
        {appsInCategory.map((app: Application) => {
          return (
            <div className={styles.item} key={app.id}>
              <ApplicationCard application={app} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categoty;
