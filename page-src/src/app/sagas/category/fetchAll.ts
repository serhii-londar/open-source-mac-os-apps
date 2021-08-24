import { takeLatest, call, put } from "redux-saga/effects";

import {
  CategoryActions,
  fetchAllCategoriesSucceedAction,
  fetchCategoryFailedAction,
} from "../../actions/category";
import Category from "../../models/category";

import { FetchAllCategories } from "../../services/Api";

function* fetchAll() {
  try {
    const categories: Category[] = yield call(FetchAllCategories);
    yield put(fetchAllCategoriesSucceedAction(categories));
  } catch (error) {
    yield put(fetchCategoryFailedAction(error));
  }
}

export default function* categoryFetchAllWatcher(): Generator {
  yield takeLatest(CategoryActions.FETCH_ALL, fetchAll);
}
