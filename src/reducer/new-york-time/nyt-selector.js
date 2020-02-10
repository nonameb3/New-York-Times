import { createSelector } from "reselect";

const nytData = state => state.nytData;

export const selectArticles = createSelector([nytData], nytData => nytData.articles);

export const selectIsLoading = createSelector([nytData], nytData => nytData.isLoading);

export const selectSearchString = createSelector([nytData], nytData => nytData.searchString);
