import { takeLatest, call, put } from "redux-saga/effects";

import {
  ApplicationActions,
  fetchAllApplicationsFailedAction,
  fetchAllApplicationsSucceedAction,
} from "../../actions/application";
import Application from "../../models/application";

import { FetchAllApplications } from "../../services/Api";

function* fetchAll() {
  try {
    const applications: Application[] = yield call(FetchAllApplications);
    yield put(fetchAllApplicationsSucceedAction(applications));
  } catch (error) {
    yield put(fetchAllApplicationsFailedAction(error));
  }
}

export default function* applicationWatchers(): Generator {
  yield takeLatest(ApplicationActions.FETCH_ALL, fetchAll);
}
