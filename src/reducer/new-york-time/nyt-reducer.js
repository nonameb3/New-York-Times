import * as TYPE from './nyt-type';

const INITIAL_STATE = {
  isNewOpen: true,
  isLoading: false,
  isNextPageLoading: false,
  isFetchData: false,
  searchOption: {
    searchString: '',
    option: 'newest',
    page: 0,
  },
  articles: [],
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    // main fetch also clear old articles and nextpage data too.
    case TYPE.FECTH_API_START:
      return {
        ...state,
        isLoading: true,
        isLoadingNextPage: false,
        articles: [],
        searchOption: { ...state.searchOption, ...action.payload, page: 0 },
      };
    case TYPE.FECTH_API_SUCCESS:
      return {
        ...state,
        articles: action.payload,
        isLoading: false,
        isNewOpen: false,
        isFetchData: true,
      };
    case TYPE.FECTH_API_FAILURE:
      return {
        ...state,
        articles: [],
        isLoading: false,
        isNextPageLoading: false,
      };
    case TYPE.FETCH_API_NEXT_PAGE_START: {
      return {
        ...state,
        searchOption: action.payload,
        isNextPageLoading: true,
      };
    }
    case TYPE.FETCH_API_NEXT_PAGE_SUCCESS:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        isNextPageLoading: false,
      };
    default:
      return state;
  }
}
