import { RawCategory } from "../models/category";

export enum CategoryActions {
  FETCH_ALL = "CATEGORY_FETCH_ALL",
  FETCH_ALL_SUCCEED = "CATEGORY_FETCH_ALL_SUCCEED",
  FETCH_ALL_FAILD = "CATEGORY_FETCH_ALL_FAILD",
}

export type CategoryAction<T = any> = {
  type: CategoryActions;
  payload?: T;
};

// ---------------------------------

export type FetchAllCategoriesAction = CategoryAction;

export const fetchAllCategoriesAction = (): FetchAllCategoriesAction => ({
  type: CategoryActions.FETCH_ALL,
});

// ---------------------------------

export type FetchAllCategoriesSucceedPayload = RawCategory[];
export type FetchAllCategoriesSucceedAction = CategoryAction<FetchAllCategoriesSucceedPayload>;

export const fetchAllCategoriesSucceedAction = (
  payload: FetchAllCategoriesSucceedPayload,
): FetchAllCategoriesSucceedAction => ({
  type: CategoryActions.FETCH_ALL_SUCCEED,
  payload,
});

// ---------------------------------

export type FetchAllCategoriesFailedPayload = any;
export type FetchAllCategoriesFaildAction = CategoryAction<FetchAllCategoriesFailedPayload>;

export const fetchCategoryFaildAction = (
  payload: FetchAllCategoriesFailedPayload,
): CategoryAction<FetchAllCategoriesFailedPayload> => ({
  type: CategoryActions.FETCH_ALL_FAILD,
  payload,
});
