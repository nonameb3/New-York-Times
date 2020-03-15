import { createSelector } from 'reselect';

const nytData = state => state.nytData;

export const selectArticles = createSelector([nytData], nytstore => nytstore.articles);

export const selectIsLoading = createSelector([nytData], nytstore => nytstore.isLoading);

export const selectUIState = createSelector([nytData], nytstore => nytstore.uiState);

export const selectIsNextPageLoading = createSelector(
  [nytData],
  nytstore => nytstore.isNextPageLoading
);
