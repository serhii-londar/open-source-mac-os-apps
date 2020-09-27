import { CategoriesAction, CategoriesActions, FetchCategoriesFailedPayload, FetchCategoriesSucceedPayload } from "../actions/categories";

export type Category = {
  id: string;
  shortName: string;
  name: string;
};

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

const LoadingCategories = (
  state: CategoriesState,
) => ({ ...state, loading: true });

const LoadingCategoriesSucceed = (
  state: CategoriesState,
  payload: FetchCategoriesSucceedPayload,
) => ({ ...state, data: payload, error: null, loading: false });

const LoadingCategoriesFailed = (
  state: CategoriesState,
  payload: FetchCategoriesFailedPayload,
) => ({ ...state, data: [], error: payload, loading: false });

export const categories = (
  state: CategoriesState = InitialCategoriesState,
  action: CategoriesAction,
) => {
  switch (action.type) {
    case CategoriesActions.FETCH:
      return LoadingCategories(state);
    case CategoriesActions.FETCH_SUCCEED:
      return LoadingCategoriesSucceed(state, action.payload);
    case CategoriesActions.FETCH_FAILD:
      return LoadingCategoriesFailed(state, action.payload);
    default:
      return { ...state };
  }
};
