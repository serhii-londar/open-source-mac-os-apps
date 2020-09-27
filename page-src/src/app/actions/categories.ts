export enum CategoriesActions {
  FETCH = "CATEGORIES_FETCH",
  FETCH_SUCCEED = "CATEGORIES_FETCH_SUCCEED",
  FETCH_FAILD = "CATEGORIES_FETCH_FAILD"
}

export type CategoriesAction<T = any> = {
  type: CategoriesActions;
  payload?: T;
};

export type CategoriesDispatch = React.Dispatch<CategoriesAction>;

// ---------------------------------

export const FetchCategoriesAction = (): CategoriesAction => ({
  type: CategoriesActions.FETCH
});

// ---------------------------------

export type FetchCategoriesSucceedPayload = any;

export const FetchCategoriesSucceedAction = (
  payload: FetchCategoriesSucceedPayload,
): CategoriesAction<FetchCategoriesSucceedPayload> => ({
  type: CategoriesActions.FETCH_SUCCEED,
  payload,
});

// ---------------------------------

export type FetchCategoriesFailedPayload = any;

export const FetchCategoriesFaildAction = (
  payload: FetchCategoriesFailedPayload,
): CategoriesAction<FetchCategoriesFailedPayload> => ({
  type: CategoriesActions.FETCH_FAILD,
  payload,
});