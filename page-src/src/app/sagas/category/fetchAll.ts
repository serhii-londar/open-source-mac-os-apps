import { takeLatest, call, put } from "redux-saga/effects";

import {
  CategoryActions,
  fetchAllCategoriesSucceedAction,
  fetchCategoryFailedAction,
} from "../../actions/category";
import { RawCategory } from "../../models/category";

import { FetchAllCategories } from "../../services/Api";

function* fetchAll() {
  try {
    const categoies: RawCategory[] = yield call(FetchAllCategories);
    yield put(fetchAllCategoriesSucceedAction(categoies));
  } catch (error) {
    yield put(fetchCategoryFailedAction(error));
  }
}

export default function* categoryFetchAllWatcher() {
  yield takeLatest(CategoryActions.FETCH_ALL, fetchAll);
}
