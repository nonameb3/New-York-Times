import { createSelector } from 'reselect';

const nytData = state => state.nytData;

export const selectArticles = createSelector([nytData], nytstore => nytstore.articles);

export const selectIsLoading = createSelector([nytData], nytstore => nytstore.isLoading);

export const selectIsFetchData = createSelector([nytData], nytstore => nytstore.isFetchData);

export const selectSearchOption = createSelector([nytData], nytstore => nytstore.searchOption);

export const selectIsNewOpen = createSelector([nytData], nytstore => nytstore.isNewOpen);

export const selectIsNextPageLoading = createSelector(
  [nytData],
  nytstore => nytstore.isNextPageLoading
);
