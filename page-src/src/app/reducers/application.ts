import {
  ApplicationActions,
  FetchAllApplicationsAction,
  FetchAllApplicationsFailedAction,
  FetchAllApplicationsFailedPayload,
  FetchAllApplicationsSucceedAction,
  FetchAllApplicationsSucceedPayload,
} from "../actions/application";
import Application from "../models/application";

export type ApplicationsState = {
  loading: boolean;
  error: unknown;
  data: Application[];
};

export const InitialApplicationsState: ApplicationsState = {
  loading: false,
  error: null,
  data: [],
};

const FetchAllApplications = (state: ApplicationsState) => ({
  ...state,
  loading: true,
});

const FetchAllApplicationsSucceed = (
  state: ApplicationsState,
  payload: FetchAllApplicationsSucceedPayload,
) => ({ ...state, data: payload, error: null, loading: false });

const FetchAllApplicationsFailed = (
  state: ApplicationsState,
  payload: FetchAllApplicationsFailedPayload,
) => ({ ...state, data: [], error: payload, loading: false });

export const applications = (
  state: ApplicationsState = InitialApplicationsState,
  action:
    | FetchAllApplicationsAction
    | FetchAllApplicationsSucceedAction
    | FetchAllApplicationsFailedAction,
): ApplicationsState => {
  switch (action.type) {
    case ApplicationActions.FETCH_ALL:
      return FetchAllApplications(state);
    case ApplicationActions.FETCH_ALL_SUCCEED:
      return FetchAllApplicationsSucceed(state, action.payload);
    case ApplicationActions.FETCH_ALL_FAILED:
      return FetchAllApplicationsFailed(state, action.payload);
    default:
      return { ...state };
  }
};
