export enum ApplicationsActions {
  FETCH = "APPLICATIONS_FETCH",
  FETCH_SUCCEED = "APPLICATIONS_FETCH_SUCCEED",
  FETCH_FAILD = "APPLICATIONS_FETCH_FAILD",
}

export type ApplicationsAction<T = any> = {
  type: ApplicationsActions;
  payload: T;
};

export type ApplicationsDispatch = React.Dispatch<ApplicationsAction>;

// ---------------------------------

export type FetchApplicationsPayload = { status: boolean };

export const FetchApplicationsAction = (
  payload: FetchApplicationsPayload,
): ApplicationsAction<FetchApplicationsPayload> => ({
  type: ApplicationsActions.FETCH,
  payload,
});

// ---------------------------------

export type FetchApplicationsSucceedPayload = any;

export const FetchApplicationsSucceedAction = (
  payload: FetchApplicationsSucceedPayload,
): ApplicationsAction<FetchApplicationsPayload> => ({
  type: ApplicationsActions.FETCH_SUCCEED,
  payload,
});

// ---------------------------------

export type FetchApplicationsFailedPayload = any;

export const FetchApplicationsFaildAction = (
  payload: FetchApplicationsFailedPayload,
): ApplicationsAction<FetchApplicationsPayload> => ({
  type: ApplicationsActions.FETCH_FAILD,
  payload,
});
