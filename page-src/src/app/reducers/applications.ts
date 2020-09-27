import {
  ApplicationsAction,
  ApplicationsActions,
  FetchApplicationsFailedPayload,
  FetchApplicationsPayload,
  FetchApplicationsSucceedPayload,
} from "../actions/applications";

type Application = any;

export type ApplicationsState = {
  loading: boolean;
  error: any;
  data: Application[];
};

export const InitialApplicationsState: ApplicationsState = {
  loading: false,
  error: null,
  data: [],
};

const LoadingApplications = (state: ApplicationsState, payload: FetchApplicationsPayload) => ({
  ...state,
  loading: payload.status,
});

const LoadingApplicationsSucceed = (
  state: ApplicationsState,
  payload: FetchApplicationsSucceedPayload,
) => ({ ...state, data: payload, error: null, loading: false });

const LoadingApplicationsFailed = (
  state: ApplicationsState,
  payload: FetchApplicationsFailedPayload,
) => ({ ...state, data: [], error: payload, loading: false });

export const applications = (
  state: ApplicationsState = InitialApplicationsState,
  action: ApplicationsAction,
) => {
  switch (action.type) {
    case ApplicationsActions.FETCH:
      return LoadingApplications(state, action.payload);
    case ApplicationsActions.FETCH_SUCCEED:
      return LoadingApplicationsSucceed(state, action.payload);
    case ApplicationsActions.FETCH_FAILD:
      return LoadingApplicationsFailed(state, action.payload);
    default:
      return { ...state };
  }
};
