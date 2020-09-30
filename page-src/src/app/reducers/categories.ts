import {
  CategoryActions,
  FetchAllCategoriesAction,
  FetchAllCategoriesFailedPayload,
  FetchAllCategoriesSucceedAction,
  FetchAllCategoriesSucceedPayload,
  FetchAllCategoriesFaildAction,
} from "../actions/category";
import Category, { RawCategory } from "../models/category";

export type CategoriesState = {
  loading: boolean;
  error: any;
  data: Category[];
};

export const InitialCategoriesState: CategoriesState = {
  loading: false,
  error: null,
  data: [],
};

const FetchAllCategories = (state: CategoriesState) => ({ ...state, loading: true });

const FetchAllCategoriesSucceed = (
  state: CategoriesState,
  payload: FetchAllCategoriesSucceedPayload,
) => {
  const categories = payload.map((rawCategory: RawCategory) => new Category(rawCategory));

  return { ...state, data: categories, error: null, loading: false };
};

const FetchAllCategoriesFailed = (
  state: CategoriesState,
  payload: FetchAllCategoriesFailedPayload,
) => ({
  ...state,
  data: [],
  error: payload,
  loading: false,
});

export const categories = (
  state: CategoriesState = InitialCategoriesState,
  action:
    | FetchAllCategoriesAction
    | FetchAllCategoriesSucceedAction
    | FetchAllCategoriesFaildAction,
) => {
  switch (action.type) {
    case CategoryActions.FETCH_ALL:
      return FetchAllCategories(state);
    case CategoryActions.FETCH_ALL_SUCCEED:
      return FetchAllCategoriesSucceed(state, action.payload);
    case CategoryActions.FETCH_ALL_FAILD:
      return FetchAllCategoriesFailed(state, action.payload);
    default:
      return { ...state };
  }
};
