import { all } from "redux-saga/effects";
import categoryWatchers from "./category";
import applicationWatchers from "./application";

export default function* rootSaga() {
  yield all([...categoryWatchers, ...applicationWatchers]);
}
