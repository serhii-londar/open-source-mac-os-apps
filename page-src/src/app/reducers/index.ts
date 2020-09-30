import { combineReducers } from "redux";

import { applications } from "./application";
import { categories } from "./categories";

const rootReducer = combineReducers({
  applications,
  categories,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
