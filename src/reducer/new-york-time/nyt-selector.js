import { createSelector } from "reselect";

const nytData = state => state.nytData;

export const selectArticles = createSelector(
  [nytData],
  nytData => nytData.articles
);

export const selectIsLoading = createSelector(
  [nytData],
  nytData => nytData.isLoading
);

export const selectIsFetchData = createSelector(
  [nytData],
  nytData => nytData.isFetchData
);

export const selectSearchOption = createSelector(
  [nytData],
  nytData => nytData.searchOption
);

export const selectIsNewOpen = createSelector(
  [nytData],
  nytData => nytData.isNewOpen
);

export const selectIsNextPageLoading = createSelector(
  [nytData],
  nytData => nytData.isNextPageLoading
);
