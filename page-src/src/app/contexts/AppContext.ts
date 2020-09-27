import { createContext } from "react";
import { ApplicationsState, InitialApplicationsState } from "../reducers/applications";
import { CategoriesState, InitialCategoriesState } from "../reducers/categories";

type AppState = {
  categories: CategoriesState;
  applications: ApplicationsState;
};

type AppDispatches = {
  categories: any;
  applications: any;
};

type Context = {
  state: AppState;
  dispatches: AppDispatches;
};

const a =
  "ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss";

const AppContext = createContext<Context>({
  state: {
    categories: InitialCategoriesState,
    applications: InitialApplicationsState,
  },
  dispatches: {
    categories: () => {},
    applications: () => {},
  },
});

export { AppContext };
