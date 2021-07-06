import { RawApplication } from "../models/application";

export enum ApplicationActions {
  FETCH_ALL = "APPLICATIONS_FETCH_ALL",
  FETCH_ALL_SUCCEED = "APPLICATIONS_FETCH_ALL_SUCCEED",
  FETCH_ALL_FAILED = "APPLICATIONS_FETCH_ALL_FAILED",
}

export type ApplicationAction<T = any> = {
  type: ApplicationActions;
  payload?: T;
};

// ---------------------------------

export type FetchAllApplicationsAction = ApplicationAction;

export const fetchAllApplicationsAction = (): FetchAllApplicationsAction => ({
  type: ApplicationActions.FETCH_ALL,
});

// ---------------------------------

export type FetchAllApplicationsSucceedPayload = RawApplication[];
export type FetchAllApplicationsSucceedAction = ApplicationAction<
  FetchAllApplicationsSucceedPayload
>;

export const fetchAllApplicationsSucceedAction = (
  payload: FetchAllApplicationsSucceedPayload,
): FetchAllApplicationsSucceedAction => ({
  type: ApplicationActions.FETCH_ALL_SUCCEED,
  payload,
});

// ---------------------------------

export type FetchAllApplicationsFailedPayload = any;
export type FetchAllApplicationsFailedAction = ApplicationAction<FetchAllApplicationsFailedPayload>;

export const fetchAllApplicationsFailedAction = (
  payload: FetchAllApplicationsFailedPayload,
): FetchAllApplicationsFailedAction => ({
  type: ApplicationActions.FETCH_ALL_FAILED,
  payload,
});
