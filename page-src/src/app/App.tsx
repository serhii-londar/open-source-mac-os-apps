import React, { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { fetchAllCategoriesAction } from "./actions/category";
import { fetchAllApplicationsAction } from "./actions/application";

import styles from "./App.module.scss";

import Application from "./components/Application/Application";
import CategoriesList from "./components/CategoriesList/CategoriesList";
import Categoty from "./components/Category/Category";
import Home from "./components/Home/Home";
import PathBuilder from "./services/PathBuilder";

enum APP_ROUTES {
  HOME = "/",
  CATEGORY = "/:category",
  APPLICATION = "/:category/:application",
}

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCategoriesAction());
    dispatch(fetchAllApplicationsAction());
  }, [dispatch]);

  return (
    <main className={styles.container}>
      <Router>
        <aside className={styles["categories-list"]}>
          <CategoriesList />
        </aside>
        <section className={styles.content}>
          <Switch>
            <Route exact path={PathBuilder.build(APP_ROUTES.HOME)} component={Home} />
            <Route exact path={PathBuilder.build(APP_ROUTES.CATEGORY)} component={Categoty} />
            <Route exact path={PathBuilder.build(APP_ROUTES.APPLICATION)} component={Application} />

            <Route path="*">
              <Redirect to={PathBuilder.build(APP_ROUTES.HOME)} />
            </Route>
          </Switch>
        </section>
      </Router>
    </main>
  );
};

export default App;
