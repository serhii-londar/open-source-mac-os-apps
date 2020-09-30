import { takeLatest, call, put } from "redux-saga/effects";

import {
  ApplicationActions,
  fetchAllApplicationsFaildAction,
  fetchAllApplicationsSucceedAction,
} from "../../actions/application";
import { RawApplication } from "../../models/application";

import { FetchAllApplications } from "../../services/Api";

function* fetchAll() {
  try {
    const applications: RawApplication[] = yield call(FetchAllApplications);
    yield put(fetchAllApplicationsSucceedAction(applications));
  } catch (error) {
    yield put(fetchAllApplicationsFaildAction(error));
  }
}

export default function* applicationWatchers() {
  yield takeLatest(ApplicationActions.FETCH_ALL, fetchAll);
}
